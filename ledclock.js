//=

// https://forums.raspberrypi.com/viewtopic.php?t=359742  // Raspberry Pi 5 - gpiod vs RPi.GPIO
// "The Pi5 has new GPIO hardware. It is not compatible with software written for earlier Pi models."

//> sudo i2cdetect -y 1
//          0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f
//     00:                         -- -- -- -- -- -- -- --
//     10: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
//     20: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
//     30: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
//     40: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
//     50: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
//     60: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
//     70: 70 -- -- -- -- -- -- --

//: > i2cdump 1 0x70
//: No size specified (using byte-data access)
//: WARNING! This program can confuse your I2C bus, cause data loss and worse!
//: I will probe file /dev/i2c-1, address 0x70, mode byte
//: Continue? [Y/n]
//:      0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f    0123456789abcdef
//:      00: 06 00 6d 00 00 00 4f 00 5b 00 00 00 00 00 00 00    ?.m...O.[.......
//:      10: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00    ................
//:      20: XX 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00    X...............
//:      30: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00    ................
//:      40: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00    ................
//:      50: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00    ................
//:      60: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00    ................
//:      70: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00    ................
//:      80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00    ................
//:      90: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00    ................
//:      a0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00    ................
//:      b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00    ................
//:      c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00    ................
//:      d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00    ................
//:      e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00    ................
//:      f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00    ................

// - - - - - - = = = - - - - - - .
// https://www.npmjs.com/package/johnny-five
// https://github.com/rwaldron/johnny-five
// "Johnny-Five v2.0 ... -- Rick Waldron on June 11th 2020" ....
//
const moment = require("moment");
const { Board, Led } = require("johnny-five");
var board = new Board();
board.on("ready", () => {
  const digits = new Led.Digits({
    controller: "HT16K33",
  });
  let toggle = 0;
  setInterval(() => {
    // Toggle the colon part: on for a second, off for a second.
    digits.print(time((toggle ^= 1)));
  }, 1000);
});
function time(showColon) {
  var display = "    " + moment().format(showColon ? "h:mm" : "h mm");
  return display.slice(-5);
}
// - - - - - - = = = - - - - - - .

// - - - - - - = = = - - - - - - .
// https://www.npmjs.com/package/raspi-io
// https://github.com/nebrius/raspi-io
// "NOTE: This project is in maintenance mode and no longer actively maintained." (last commit: 6 years ago @2025)
// npm install raspi-io
//
// const Raspi = require("raspi-io").RaspiIO;
// const five = require("johnny-five");
// const board = new five.Board({
//   io: new Raspi(),
// });
// board.on("ready", () => {
//   // Create an Led on pin 7 (GPIO4) on P1 and strobe it on/off
//   // Optionally set the speed; defaults to 100ms
//   new five.Led("P1-7").strobe();
// });
// - - - - - - = = = - - - - - - .

//-eof
