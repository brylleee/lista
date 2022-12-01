import React, { useEffect, useState } from 'react';
import { Html5Qrcode } from "html5-qrcode";

const spreadsheetID = "1BEdgdwItam2jOA9MGEhtexD3MqK21Y0mMxxBebvooO4"; 
const accessToken = ""; //TOKEN
// Our main component
const App = () => {
    // Name, guild, and section states that updates everytime QR Code is scanned
    let [name, setName] = useState("");
    let [guild, setGuild] = useState("");
    let [section, setSection] = useState("");

    // Separate name, guild, and section and return it as different variables
    let parseResult = (qrcodeContent) => {
        let splitted = qrcodeContent.split(" [|] ");  // QR Code content example: Dela Cruz, Juan A. [|] IREDOC [|] STEM1201
        return {
            name: splitted[0],
            guild: splitted[1],
            section: splitted[2]
        }
    }

    let updateSheetValues = (name, guild, section) => {
      
      fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetID}:batchUpdate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //update this token with yours. 
          Authorization: `Bearer ${accessToken}`,
        },
        
        body: JSON.stringify({
          "requests": [
            {
              "appendCells": {
                "rows": [
                  {
                    "values": [
                      {
                        "userEnteredValue": {
                          "stringValue": name
                        }
                      },
                      {
                        "userEnteredValue": {
                          "stringValue": guild
                        }
                      },
                      {
                        "userEnteredValue": {
                          "stringValue": section
                        }
                      }
                    ]
                  }
                ],
                "fields": "*"
              }
            }
          ]
        })
      })
    }
    // useEffect() means if this component is rendered (shown to the user)
    useEffect(() => {
        const html5QrCode = new Html5Qrcode("reader");  // Use the div with id 'reader' as our QR Code Reader
        const config = { fps: 10, qrbox: 250 };  //  QR Code Reader configurations

        // Start reader using back camera
        html5QrCode.start({ facingMode: "user" }, config,
            (text, result) => {
                // Parse QR Code content and update our states
                let parsed = parseResult(text);

                setName("");
                setGuild("");
                setSection("");

                setName(parsed.name);
                setGuild(parsed.guild);
                setSection(parsed.section);

                //Update Google Sheets
                updateSheetValues(parsed.name, parsed.guild, parsed.section);
            },
            (errorMessage) => {
                // If scan has error, this block will execute
                console.log(errorMessage);
            }
        ).catch((err) => {
            // This block will execute if the app has trouble starting the camera
            console.log(err);
        });
    }, []);

    // Render all visible parts of our app, place all (HTML) contents here
    return (
        <div>
            {/* The topbar. We can add menu buttons and/or settings button here */}
            <div id="topbar">
                Lista
            </div>

            {/* The camera. We don't need to touch this */}
            <div id="reader"></div>

            {/* Display QR Code content. This is a temporary proof of concept
                QR Code content should be synced to google sheets */}
            <div align="center">
                <p id="name">{ name }</p>
                <p id="guild">{ guild }</p>
                <p id="section">{ section }</p>
            </div>
        </div>
    )
};
export default App;
