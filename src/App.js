import React, { useEffect, useState } from 'react';
import { Html5Qrcode } from "html5-qrcode";

import * as Ons from 'react-onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

const spreadsheetID = "1BEdgdwItam2jOA9MGEhtexD3MqK21Y0mMxxBebvooO4";
// The access token changes every few minutes
const accessToken = "TOKEN";

// Our main component
const App = () => {
    // Name, guild, and section states that updates everytime QR Code is scanned
    let [name, setName] = useState("");
    let [studentNumber, setStudentNumber] = useState("");
    let [guild, setGuild] = useState("");
    let [section, setSection] = useState("");

    // Separate name, guild, and section and return it as different variables
    let parseResult = (qrcodeContent) => {
        let splitted = qrcodeContent.split(" [|] ");  // QR Code content example: Dela Cruz, Juan A. [|] IREDOC [|] STEM1201
        return {
            name: splitted[0],
            studentNumber: splitted[1],
            guild: splitted[2],
            section: splitted[3]
        }
    }

    let updateAttendance = (name, guild, section, timeIn) => {
        fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetID}:batchUpdate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //update this token with yours.
                Authorization: `Bearer ${accessToken}`,
            },

            body: JSON.stringify({
                "requests": [{
                    "appendCells": {
                        "rows": [{
                            "values": [
                                {
                                    // NAME
                                    "userEnteredValue": {
                                        "stringValue": name
                                    }
                                },
                                {
                                    // GUILD
                                    "userEnteredValue": {
                                        "stringValue": guild
                                    }
                                },
                                {
                                    // SECTION
                                    "userEnteredValue": {
                                        "stringValue": section
                                    }
                                },
                                {
                                    // TIME IN
                                    "userEnteredValue": {
                                        "stringValue": timeIn
                                    }
                                },
                            ]
                        }],
                        "fields": "*"
                    },
                }]
            })
        })
    }

    // Variable to compare the last result to the recent QR code
    let lastResult = "";

    // useEffect() means if this component is rendered (shown to the user)
    useEffect(() => {
        const html5QrCode = new Html5Qrcode("reader");  // Use the div with id 'reader' as our QR Code Reader
        const config = { fps: 10, qrbox: 150};  //  QR Code Reader configurations

        // Start reader using back camera
        html5QrCode.start({ facingMode: "environment" }, config,
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
            let timeIn = new Date().toLocaleTimeString();
                updateAttendance(parsed.name, parsed.guild, parsed.section, timeIn);
            }
        },
        (errorMessage) => {
            // If scan has error, this block will execute
            console.log(errorMessage);
        }).catch((err) => {
            // This block will execute if the app has trouble starting the camera
            console.log(err);
        });
    }, []);

    // Render all visible parts of our app, place all (HTML) contents here
    return (
        <Ons.Page>

            <Ons.Splitter>
                <Ons.SplitterSide
                    side="left"
                    width={ "300" }
                    isSwipeable={ true }
                    collapse={ true }>

                    <Ons.Page> Page Left </Ons.Page>
                </Ons.SplitterSide>

                <Ons.SplitterContent>
                    <Ons.Page renderToolbar={() =>
                        <Ons.Toolbar id="toolbar">
                            <div className="left">
                                <div className="sidebyside">
                                    <Ons.Icon icon="md-menu"></Ons.Icon>
                                    <span id="toolbar-title">Lista</span>
                                </div>
                            </div>
                        </Ons.Toolbar>}>

                        <br /><br />

                        <div id="reader"></div>

                        <br /><br /><hr />

                        {/* Display QR Code content. This is a temporary proof of concept
                            QR Code content should be synced to google sheets */}
                        <div align="center">
                            <h2>Student Information</h2>

                            <div id="student-information">
                                <p id="name">Name: { name }</p>
                                <p id="student-number">Student number: { studentNumber }</p>
                                <p id="guild">Guild: { guild }</p>
                                <p id="section">Section: { section }</p>
                            </div>
                        </div>
                    </Ons.Page>
                </Ons.SplitterContent>
            </Ons.Splitter>
        </Ons.Page>
    )
};

export default App;
