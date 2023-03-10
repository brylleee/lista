import React, { useEffect, useState } from "react";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import * as Ons from "react-onsenui";
import "onsenui/css/onsenui.css";
import "onsenui/css/onsen-css-components.css";

import aes from 'crypto-js/aes';

const spreadsheetID = "11RqY4Jn96s1yNMwwe1TFKE-qG_GLpD3hknE9s5KOdMc";
let sheetName = ""

// Sheetson API Key
let accessToken = "ANoFxigSUp21rcCnAc9GN9eluG-GR4SS_TXxsvEurk1C2LNGmBzOX-io9YI";

// Our main component
const App = () => {
    // Name, guild, and section states that updates everytime QR Code is scanned
    let [name, setName] = useState("");
    let [studentNumber, setStudentNumber] = useState("");
    let [guild, setGuild] = useState("");
    let [section, setSection] = useState("");

    let [sideMenuOpen, setSideMenuOpen] = useState(false);
    let [hasScanned, setHasScanned] = useState(false);
    let [nameNotFound, setNameNotFound] = useState(false);
    let [cameraNoPermission, setCameraNoPermission] = useState(false);

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

    const LISTOGuilds = [ "IREDOC", "SWES", "ETIKA", "NUMERIKA", "LETRA" ];
    const GILASGuilds = [ "AWIT", "GALAW", "INSTRUMENTO", "LITERATURA", "SINING (MULTIMEDIA)", "SINING (VISUAL ARTS)" ];

    let sections;

    let updateAttendance = async (attName, section, guild) => {
        attName = attName.replace(/\s\w{1,2}\.$/, "");  // Stripped middle name

        // Decide what sheet to use depending on student's CLUB
        // Then decide section location
        if(LISTOGuilds.includes(guild)) {
            sheetName = "LISTA_SectionBased_Attendance";
            sections = {
                "ABM1101": [3, 6],
                "CA1101": [8, 21],
                "DA1101": [8, 21],
                "HUMSS1101": [23, 28],
                "TO1101": [23, 28],
                "ITM1101": [30, 53],
                "STEM1101": [55, 81],
                "STEM1102": [83, 92],
                "ABM1201": [94, 112],
                "CA1201": [114, 120],
                "DA1201": [114, 120],
                "HUMSS1201": [122, 133],
                "ITM1201": [135, 159],
                "STEM1201": [161, 177],
                "STEM1202": [179, 194],
            };
        } else if(GILASGuilds.includes(guild)) {
            sheetName = "LISTA_SectionBased_GILAS_Attendance";
            sections = {
                "STEM1101": [3, 10],
                "STEM1102": [12, 40],
                "ABM1101": [42, 51],
                "HUMSS1101": [53, 67],
                "ITM1101": [69, 82],
                "TO1101": [84, 94],
                "CA1101": [96, 100],
                "DA1101": [102, 106],
                "STEM1201": [108, 123],
                "STEM1202": [125, 133],
                "ABM1201": [135, 148],
                "HUMSS1201": [150, 160],
                "TO1201": [162, 183],
                "ITM1201": [185, 194],
                "CA1201": [196, 202],
                "DA1201": [204, 210],
            };
        }

        // Get header rows
        const header = await fetch(`https://api.sheetson.com/v2/sheets/${sheetName}/1/?` + new URLSearchParams({ apiKey: accessToken, spreadsheetId: spreadsheetID }),
        {
	        method: "GET"
        });

                                                    // Slice 4 onwards (The index of dates in header)
        let dates = Object.keys(await header.json()).slice(4);
        let today = dates[dates.length - 1];

        // Get section students [limit: # of students, skip: start from index]
        const request = await fetch(`https://api.sheetson.com/v2/sheets/${sheetName}/?` + new URLSearchParams({
            limit: (sections[section][1] - sections[section][0]) + 1,
            skip: sections[section][0] - 1,
            apiKey: accessToken, spreadsheetId: spreadsheetID
        }), {
	        method: "GET"
        });

        const data = await request.json();

        // Loop through students, then mark as present if found
        for (let student of data["results"]) {
            if(student["Name"].slice(0, attName.length) === attName) {
                await fetch(`https://api.sheetson.com/v2/sheets/${sheetName}/${student["rowIndex"]}/?`, {
                    method: "PUT",
                    headers: {
                            "Authorization": `Bearer ${accessToken}`,
                            "X-Spreadsheet-Id": spreadsheetID,
                            "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ [today]: "P" })
                });

                return;
            }
        }

        setNameNotFound(true);
        return data;
    };

    // useEffect() means if this component is rendered (shown to the user)
    useEffect(() => {
        const html5QrCode = new Html5Qrcode("reader", {
            formatsToSupport: [ Html5QrcodeSupportedFormats.QR_CODE ]
        }); // Use the div with id 'reader' as our QR Code Reader
        const config = { fps: 5, qrbox: 200 }; //  QR Code Reader configurations

        // Start reader using back camera
        html5QrCode
            .start(
                { facingMode: "environment" },
                config,
                (text, result) => {
                    // Parse QR Code content and update our states
                    let parsed = parseResult(aes.decrypt(text, "@stamaria.sti.edu.ph").toString()  // Raw result to hex
                                    .match(/.{1,2}/g).map(function(v) {                // Hex to string
                                        return String.fromCharCode(parseInt(v, 16));
                                    }).join(''))

                    setName(parsed.name);
                    setStudentNumber(parsed.studentNumber);
                    setGuild(parsed.guild);
                    setSection(parsed.section);

                    setHasScanned(true);
                },
            )
            .catch((err) => {
                // This block will execute if the app has trouble starting the camera
                setCameraNoPermission(true);
            });
    }, []);

    let confirmAttendance = () => {
        updateAttendance(name, section, guild);

        setHasScanned(false);

        setName("");
        setStudentNumber("");
        setGuild("");
        setSection("");
    }

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

                    <Ons.Page>
                        <div id="logo" align="center" >
                            <img src={ require("./assets/iredoc-logo.png") } style={{ height: "300px" }} alt="iredoclogo" />
                        </div>

                        <hr />

                        <p align="center">STI LISTO Club All Rights Reserved</p>
                        <p align="center">PBP Group | IREDOC Guild</p>
                    </Ons.Page>
                </Ons.SplitterSide>

                <Ons.SplitterContent>
                    <Ons.Page
                        renderToolbar={ renderToolbar }>

                        <br /><br />

                        <Ons.AlertDialog isOpen={ nameNotFound } cancelable>
                            <div className="alert-dialog-title">Aw snap! No name found</div>
                            <div className="alert-dialog-content">
                                It could be because a student's name in the QR Code has a typo, or their name in Google Sheets has a typo. <br /><br />
                                Try editing the name and try again, if that doesn't work look up their name in Google Sheets
                            </div>

                            <div className="alert-dialog-footer">
                                <Ons.Button className="alert-dialog-button" onClick={ () => setNameNotFound(false) }>
                                    Okie-dokey
                                </Ons.Button>
                            </div>
                        </Ons.AlertDialog>

                        <Ons.AlertDialog isOpen={ cameraNoPermission } cancelable>
                            <div className="alert-dialog-title">Oops! I can't see</div>
                            <div className="alert-dialog-content">
                                I don't have permission to use your camera! I can't scan QR Codes! <br /><br />
                                Please enable Camera permissions on your device settings and restart the app!
                            </div>

                            <div className="alert-dialog-footer">
                                <Ons.Button className="alert-dialog-button" onClick={ () => setCameraNoPermission(false) }>
                                    Okay!
                                </Ons.Button>
                            </div>
                        </Ons.AlertDialog>


                        <div id="reader"></div>

                        <br /><br />

                        {/* Display QR Code content. This is a temporary proof of concept
                            QR Code content should be synced to google sheets */}
                        <div align="center" id="student-information">
                            <Ons.Card>
                                <h2 className="title" align="center">Student Information</h2>

                                <p id="name">Name: <Ons.Input style={{ fontFamily: "barlowLight" }} value={ name } onChange={ (event) => setName(event.target.value) } /></p>
                                <p id="student-number">Student number: {studentNumber}</p>
                                <p id="guild">Guild: {guild}</p>
                                <p id="section">Section: {section}</p>
                            </Ons.Card>
                        </div>

                        <div id="buttons">
                            <Ons.Button modifier="large--cta" onClick={ confirmAttendance } disabled={ !hasScanned }>
                                CONFIRM
                            </Ons.Button>
                        </div>
                    </Ons.Page>
                </Ons.SplitterContent>
            </Ons.Splitter>
        </Ons.Page>
    );
};

export default App;
