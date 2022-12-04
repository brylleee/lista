import React, { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

import * as Ons from "react-onsenui";
import "onsenui/css/onsenui.css";
import "onsenui/css/onsen-css-components.css";

const spreadsheetID = "1BEdgdwItam2jOA9MGEhtexD3MqK21Y0mMxxBebvooO4";
const sheetName = "ListaAttendance"  // SHEET NAME
const sheetID = 0  // SHEET ID
const accessToken = "";

// Our main component
const App = () => {
    // Name, guild, and section states that updates everytime QR Code is scanned
    let [name, setName] = useState("");
    let [studentNumber, setStudentNumber] = useState("");
    let [guild, setGuild] = useState("");
    let [section, setSection] = useState("");

    let [sideMenuOpen, setSideMenuOpen] = useState(false);

    // Separate name, guild, and section and return it as different variables
    let parseResult = (qrcodeContent) => {
        let splitted = qrcodeContent.split(" [|] ");  // QR Code content example: Dela Cruz, Juan A. [|] Student No. [|] IREDOC [|] STEM1201
        return {
            name: splitted[0],
            studentNumber: splitted[1],
            guild: splitted[2],
            section: splitted[3],
        };
    };

    const sections = {
        "ABM1101": [4, 7],
        "CA1101": [9, 22],
        "DA1101": [9, 22],
        "HUMSS1101": [24, 29],
        "TO1101": [24, 29],
        "ITM1101": [31, 54],
        "STEM1101": [56, 81],
        "STEM1102": [83, 92],
        "ABM1201": [95, 113],
        "CA1201": [115, 121],
        "DA1201": [115, 121],
        "HUMSS1201": [123, 134],
        "ITM1201": [136, 160],
        "STEM1201": [162, 178],
        "STEM1202": [180, 195],
    };

    let updateAttendance = async (name, section) => {
        // Name Index: Position of the Student's name in the Google Sheet
        var nameIndex = 1;
        const meetingDatesStartIndex = 3;
        let nextMeetingDay;

        const sheetDates = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetID}/values/${sheetName}!D2:2`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        const dates = (await sheetDates.json())["values"][0];
        const dateToday = new Date();

        // Check if today is already added in the meeting dates row
        if(dates[dates.length-1] === dateToday.toLocaleDateString('en-us',
                                                    { month: 'short' , day: 'numeric' }).split(" ").join(". ")) {
            nextMeetingDay = dates.length;
        } else {
            console.log("Cannot find Current Date in Google Sheets\nAdding a new Column!");

            fetch(
                `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetID}:batchUpdate`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        //update this token with yours.
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                        "requests": [{
                            "updateCells": {
                                "range": {
                                    "sheetId": sheetID,
                                    "startColumnIndex": meetingDatesStartIndex + dates.length ,
                                    "endColumnIndex": meetingDatesStartIndex + dates.length + 1,
                                    "endRowIndex": 2,
                                    "startRowIndex": 1
                                },
                                "fields": "*",
                                "rows": [{
                                    "values": [{
                                        "userEnteredValue":{
                                            "stringValue": dateToday.toLocaleDateString('en-us', { month: 'short' , day: 'numeric' }).split(" ").join(". ")
                                        }
                                    }]
                                }]
                            }
                        }]
                    }),
                }
            );

            nextMeetingDay = dates.length + 1;
        }

        const request = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetID}/values/${sheetName}!A${sections[section][0]}:B${sections[section][1]}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        const data = await request.json();

        // Finding and getting the position of the Student's name
        for (var i in data["values"]) {
            if (data["values"][i][1] === name) {
                nameIndex = parseInt(i) +  sections[section][0];
                console.log("Located at Column 1, Row " + nameIndex);

                fetch(
                    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetID}:batchUpdate`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${accessToken}`,
                        },

                        body: JSON.stringify({
                            requests: [
                                {
                                    updateCells: {
                                        rows: [
                                            {
                                                values: [
                                                    {
                                                        userEnteredValue: {
                                                            stringValue:
                                                                "ATTENDED",
                                                        },
                                                    },
                                                ],
                                            },
                                        ],
                                        range: {
                                            sheetId: sheetID,
                                            // Change Meeting Day
                                            startColumnIndex: meetingDatesStartIndex + (nextMeetingDay - 1),
                                            endColumnIndex: meetingDatesStartIndex + nextMeetingDay,
                                            endRowIndex: nameIndex,
                                            startRowIndex: nameIndex - 1,
                                        },
                                        fields: "*",
                                    },
                                },
                            ],
                        }),
                    }
                );
                return;
            }
        }

        console.log("Couldn't Find Name");
        console.log(data);
        return data;
    };

    // Variable to compare the last result to the recent QR code
    let lastResult = "";

    // useEffect() means if this component is rendered (shown to the user)
    useEffect(() => {
        const html5QrCode = new Html5Qrcode("reader"); // Use the div with id 'reader' as our QR Code Reader
        const config = { fps: 10, qrbox: 200 }; //  QR Code Reader configurations

        // Start reader using back camera
        html5QrCode
            .start(
                { facingMode: "environment" },
                config,
                (text, result) => {
                    // Parse QR Code content and update our states
                    let parsed = parseResult(text);

                    setName(parsed.name);
                    setStudentNumber(parsed.studentNumber);
                    setGuild(parsed.guild);
                    setSection(parsed.section);

                    //This conditions stops the application from updating the spreadsheet when showing the same QR code
                    if (text !== lastResult) {
                        lastResult = text;

                        updateAttendance(parsed.name, parsed.section);
                    }
                },
                (errorMessage) => {
                    // If scan has error, this block will execute
                    console.log(errorMessage);
                }
            )
            .catch((err) => {
                // This block will execute if the app has trouble starting the camera
                console.log(err);
            });
    }, []);

    let renderToolbar = () => {
        return (
            <Ons.Toolbar id="toolbar">
                <div className="left">
                    <div className="sidebyside">
                        <Ons.ToolbarButton style={{ color: "white" }} onClick={ () => setSideMenuOpen(true) }>
                            <Ons.Icon icon="md-menu"></Ons.Icon>
                        </Ons.ToolbarButton>

                        <span id="toolbar-title">Lista</span>
                    </div>
                </div>
            </Ons.Toolbar>
        );
    }

    // Render all visible parts of our app, place all (HTML) contents here
    return (
        <Ons.Page>
            <Ons.Splitter>
                <Ons.SplitterSide
                    side="left"
                    width={ "300" }
                    swipeable={ true }
                    collapse={ true }
                    isOpen={ sideMenuOpen }
                    onPostClose={ () => setSideMenuOpen(false) }>

                    <Ons.Page> Page Left </Ons.Page>
                </Ons.SplitterSide>

                <Ons.SplitterContent>
                    <Ons.Page
                        renderToolbar={ renderToolbar }>

                        <br /><br />

                        <div id="reader"></div>

                        <br /><br />

                        {/* Display QR Code content. This is a temporary proof of concept
                            QR Code content should be synced to google sheets */}
                        <div align="center" id="student-information">
                            <Ons.Card>
                                <h2 className="title" align="center">Student Information</h2>

                                <p id="name">Name: {name}</p>
                                <p id="student-number">Student number: {studentNumber}</p>
                                <p id="guild">Guild: {guild}</p>
                                <p id="section">Section: {section}</p>
                            </Ons.Card>
                        </div>
                    </Ons.Page>
                </Ons.SplitterContent>
            </Ons.Splitter>
        </Ons.Page>
    );
};

export default App;
