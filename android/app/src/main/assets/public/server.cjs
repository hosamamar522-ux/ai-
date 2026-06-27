var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_cors = __toESM(require("cors"), 1);
var import_dotenv = __toESM(require("dotenv"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
import_dotenv.default.config();
var app = (0, import_express.default)();
var PORT = 3e3;
app.use((0, import_cors.default)());
app.use(import_express.default.json({ limit: "50mb" }));
var aiClient = null;
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
    return null;
  }
  if (!aiClient) {
    aiClient = new import_genai.GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  }
  return aiClient;
}
var fallbackYemeniChat = (message, dialect) => {
  const msg = message.toLowerCase().trim();
  const dialectNameAr = {
    sanaani: "\u0627\u0644\u0635\u0646\u0639\u0627\u0646\u064A\u0629",
    taizzi: "\u0627\u0644\u062A\u0639\u0632\u064A\u0629",
    adeni: "\u0627\u0644\u0639\u062F\u0646\u064A\u0629",
    hadhrami: "\u0627\u0644\u062D\u0636\u0631\u0645\u064A\u0629",
    tihami: "\u0627\u0644\u062A\u0647\u0627\u0645\u064A\u0629",
    maribi: "\u0627\u0644\u0645\u0623\u0631\u0628\u064A\u0629",
    ibbi: "\u0627\u0644\u0625\u0628\u064A\u0629",
    shabwani: "\u0627\u0644\u0634\u0628\u0648\u0627\u0646\u064A\u0629"
  }[dialect] || "\u0627\u0644\u0639\u0627\u0645\u064A\u0629 \u0627\u0644\u064A\u0645\u0646\u064A\u0629";
  const isFusha = msg.includes("\u0623\u0648\u062F") || msg.includes("\u0627\u0644\u0631\u062C\u0627\u0621") || msg.includes("\u062A\u0641\u0636\u0644") || msg.includes("\u062E\u0637\u0627\u0628") || msg.includes("\u0631\u0633\u0645\u064A") || msg.includes("\u0627\u0644\u0648\u0632\u0627\u0631") || msg.includes("\u0623\u0631\u062C\u0648") || msg.includes("\u0647\u0644 \u064A\u0645\u0643\u0646") || msg.includes("\u0627\u0644\u0633\u0644\u0627\u0645 \u0639\u0644\u064A\u0643\u0645");
  if (isFusha) {
    if (msg.includes("\u0647\u0644\u0627") || msg.includes("\u0645\u0631\u062D\u0628") || msg.includes("\u0627\u0644\u0633\u0644\u0627\u0645") || msg.includes("\u0633\u0644\u0627\u0645")) {
      return "\u0627\u0644\u0633\u0644\u0627\u0645 \u0639\u0644\u064A\u0643\u0645 \u0648\u0631\u062D\u0645\u0629 \u0627\u0644\u0644\u0647 \u0648\u0628\u0631\u0643\u0627\u062A\u0647 \u064A\u0627 \u0641\u0646\u062F\u0645! \u0623\u0647\u0644\u0627\u064B \u0648\u0633\u0647\u0644\u0627\u064B \u0628\u0643 \u0641\u064A \u0645\u0646\u0635\u0629 \u064A\u0645\u0646 AI. \u0623\u0646\u0627 \u0635\u0627\u062D\u0628\u0643\u060C \u0645\u0633\u0627\u0639\u062F\u0643 \u0627\u0644\u0630\u0643\u064A \u0627\u0644\u0645\u062E\u0635\u0635 \u0644\u062C\u0645\u0647\u0648\u0631\u062A\u064A\u0646\u0627 \u0627\u0644\u064A\u0645\u0646\u064A\u0629 \u0627\u0644\u062D\u0628\u064A\u0628\u0629. \u064A\u0633\u0639\u062F\u0646\u064A \u0643\u062B\u064A\u0631\u0627\u064B \u062A\u0642\u062F\u064A\u0645 \u0627\u0644\u062F\u0639\u0645 \u0627\u0644\u0645\u0639\u0631\u0641\u064A \u0648\u0627\u0644\u062A\u0639\u0644\u064A\u0645\u064A \u0648\u0627\u0644\u0625\u062F\u0627\u0631\u064A \u0628\u0644\u063A\u0629 \u0639\u0631\u0628\u064A\u0629 \u0641\u0635\u062D\u0649 \u0645\u062A\u0642\u0646\u0629 \u0648\u0635\u064A\u0627\u063A\u0629 \u0643\u0627\u0641\u0629 \u0645\u0639\u0627\u0645\u0644\u0627\u062A\u0643 \u0627\u0644\u0631\u0633\u0645\u064A\u0629 \u0648\u062E\u0637\u0627\u0628\u0627\u062A\u0643 \u0628\u062F\u0642\u0629 \u0645\u062A\u0646\u0627\u0647\u064A\u0629. \u0643\u064A\u0641 \u064A\u0645\u0643\u0646\u0646\u064A \u062E\u062F\u0645\u062A\u0643 \u0627\u0644\u064A\u0648\u0645\u061F";
    }
    if (msg.includes("\u0643\u064A\u0641") || msg.includes("\u062D\u0627\u0644\u0643")) {
      return "\u0623\u0646\u0627 \u0641\u064A \u0623\u062A\u0645 \u0627\u0644\u0635\u062D\u0629 \u0648\u0627\u0644\u0639\u0627\u0641\u064A\u0629 \u0648\u0627\u0644\u062D\u0645\u062F \u0644\u0644\u0647\u060C \u0648\u0623\u0639\u0645\u0644 \u0628\u0643\u0627\u0645\u0644 \u0637\u0627\u0642\u062A\u064A \u0644\u062E\u062F\u0645\u0629 \u0623\u0647\u0644 \u0627\u0644\u064A\u0645\u0646 \u0627\u0644\u0643\u0631\u0627\u0645 \u0648\u0645\u0633\u0627\u0639\u062F\u062A\u0643\u0645 \u0641\u064A \u0634\u062A\u0649 \u0627\u0644\u0645\u062C\u0627\u0644\u0627\u062A. \u0637\u0645\u0646\u064A \u0643\u064A\u0641 \u0647\u064A \u0623\u062D\u0648\u0627\u0644\u0643 \u0623\u0646\u062A\u060C \u0648\u0643\u064A\u0641 \u064A\u0645\u0643\u0646\u0646\u064A \u0623\u0646 \u0623\u064A\u0633\u0631 \u0644\u0643 \u0623\u0639\u0645\u0627\u0644\u0643 \u0627\u0644\u064A\u0648\u0645\u061F";
    }
  }
  if (msg.includes("\u0647\u0644\u0627") || msg.includes("\u0645\u0631\u062D\u0628") || msg.includes("\u0627\u0644\u0633\u0644\u0627\u0645") || msg.includes("\u0633\u0644\u0627\u0645")) {
    if (dialect === "sanaani") {
      return "\u064A\u0627 \u0647\u0644\u0627 \u0648\u063A\u0644\u0627 \u0648\u0635\u062D\u0646 \u062D\u0644\u0627\u060C \u0623\u0631\u062D\u0628 \u062A\u0631\u0627\u062D\u064A\u0628 \u0627\u0644\u0645\u0637\u0631 \u064A\u0627 \u0631\u0643\u0646\u064A! \u0643\u064A\u0641 \u062D\u0627\u0644\u0643 \u0648\u0635\u062D\u062A\u0643\u061F \u0623\u0646\u0627 \u0635\u0627\u062D\u0628\u0643 \u0648\u0645\u0633\u0627\u0639\u062F\u0643 \u0627\u0644\u0630\u0643\u064A \u0628\u0644\u0647\u062C\u062A\u0646\u0627 \u0627\u0644\u0635\u0646\u0639\u0627\u0646\u064A\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629. \u0622\u0645\u0631\u0646\u064A \u0628\u0641\u062F\u064A\u062A\u0643\u060C \u0625\u064A\u0634 \u062A\u0634\u062A\u064A \u0623\u0633\u0648\u064A \u0644\u0643 \u0627\u0644\u064A\u0648\u0645\u061F";
    } else if (dialect === "adeni") {
      return "\u064A\u0627 \u0647\u0644\u0627 \u0648\u0627\u0644\u0644\u0647 \u0628\u0643 \u064A\u0627 \u0637\u064A\u0628! \u0646\u0648\u0651\u0631\u062A \u0627\u0644\u062D\u062A\u0651\u0629 \u064A\u0627 \u0639\u064A\u0646\u064A. \u0643\u064A\u0641 \u0623\u0645\u0648\u0631\u0643 \u0648\u0643\u064A\u0641 \u0627\u0644\u062F\u0646\u064A\u0627 \u0645\u0639\u0643\u061F \u0623\u0646\u0627 \u0635\u0627\u062D\u0628\u0643 \u0627\u0644\u0630\u0643\u064A \u0628\u0627\u0644\u0639\u062F\u0646\u064A \u0627\u0644\u0642\u062D\u060C \u0623\u064A\u0634 \u062A\u0634\u062A\u0647\u064A \u0646\u0635\u0644\u062D \u0644\u0643 \u0627\u0644\u064A\u0648\u0645\u061F \u0642\u0648\u0644 \u0628\u0633 \u0648\u0627\u0628\u0634\u0631!";
    } else if (dialect === "taizzi") {
      return "\u0623\u0647\u0644\u0627\u064B \u0648\u0633\u0647\u0644\u0627\u064B \u0648\u0645\u0633\u0647\u0644\u0627\u064B \u0628\u064A\u0643 \u064A\u0627 \u063A\u0627\u0644\u064A! \u0642\u0648\u0627\u0643 \u0631\u0628\u064A. \u0643\u064A\u0641 \u062D\u0627\u0644\u0643 \u0648\u0639\u0627\u0641\u064A\u062A\u0643\u061F \u0623\u0646\u0627 \u0635\u0627\u062D\u0628\u0643 \u0627\u0644\u0630\u0643\u064A \u0628\u0644\u0647\u062C\u0629 \u062A\u0639\u0632 \u0627\u0644\u0639\u0632 \u0627\u0644\u062D\u0627\u0644\u064A\u0629. \u0625\u064A\u0634 \u062A\u0634\u064A \u0623\u0633\u0627\u0639\u062F\u0643 \u0641\u064A\u0647 \u0627\u0644\u064A\u0648\u0645\u061F \u0639\u064A\u0648\u0646\u064A \u0644\u0643!";
    } else if (dialect === "hadhrami") {
      return "\u062D\u064A\u0627\u0643 \u0627\u0644\u0644\u0647 \u0648\u0628\u064A\u0627\u0643 \u064A\u0627 \u0637\u064A\u0628 \u0627\u0644\u0623\u0646\u0641\u0627\u0633! \u0645\u0631\u062D\u0628 \u0627\u0644\u0633\u0627\u0639 \u0648\u0639\u0644\u0627 \u0627\u0644\u0639\u064A\u0646 \u0648\u0627\u0644\u0631\u0627\u0633. \u0643\u064A\u0641 \u062D\u0627\u0644\u0643 \u064A\u0627 \u062E\u0648\u064A\u061F \u0623\u0646\u0627 \u0635\u0627\u062D\u0628\u0643 \u0627\u0644\u0630\u0643\u064A \u0628\u0627\u0644\u0644\u0647\u062C\u0629 \u0627\u0644\u062D\u0636\u0631\u0645\u064A\u0629 \u0627\u0644\u0645\u0632\u064A\u0648\u0646\u0629. \u0628\u063A\u064A\u062A \u0634\u064A \u0646\u0633\u0627\u0639\u062F\u0643 \u0641\u064A\u0647\u061F \u0622\u0645\u0631 \u0648\u062A\u062F\u0644\u0644!";
    } else {
      return `\u0645\u0631\u062D\u0628\u0627\u064B \u0628\u0643 \u064A\u0627 \u063A\u0627\u0644\u064A! \u0623\u0646\u0627 \u0635\u0627\u062D\u0628\u0643 \u0648\u0645\u0633\u0627\u0639\u062F\u0643 \u0627\u0644\u0630\u0643\u064A \u0628\u0644\u0647\u062C\u0629 ${dialectNameAr}. \u0643\u064A\u0641 \u064A\u0645\u0643\u0646\u0646\u064A \u0623\u0646 \u0623\u0633\u0627\u0639\u062F\u0643 \u0627\u0644\u064A\u0648\u0645 \u0641\u064A \u0627\u0644\u062A\u0639\u0644\u064A\u0645 \u0623\u0648 \u0627\u0644\u062A\u062C\u0627\u0631\u0629 \u0623\u0648 \u0627\u0644\u062A\u0631\u062C\u0645\u0629 \u0623\u0648 \u0623\u064A \u0634\u064A\u0621 \u064A\u062E\u0635 \u0627\u0644\u064A\u0645\u0646 \u0627\u0644\u062D\u0628\u064A\u0628\u061F`;
    }
  }
  if (msg.includes("\u0643\u064A\u0641") || msg.includes("\u062D\u0627\u0644\u0643")) {
    if (dialect === "sanaani") {
      return "\u0623\u0646\u0627 \u0628\u062E\u064A\u0631 \u0648\u0627\u0644\u062D\u0645\u062F \u0644\u0644\u0647 \u0641\u0648\u0642 \u0627\u0644\u062E\u064A\u0644 \u064A\u0627 \u0631\u0643\u0646\u064A! \u0642\u0648\u0627\u0643 \u0631\u0628\u064A \u0648\u0639\u0627\u0641\u0627\u0643. \u0623\u0646\u062A \u0643\u064A\u0641 \u062D\u0627\u0644\u0643 \u0648\u0643\u064A\u0641 \u0627\u0644\u0623\u0647\u0644 \u0648\u0627\u0644\u0623\u062D\u0648\u0627\u0644\u061F \u0637\u0645\u0646\u0627 \u0639\u0644\u064A\u0643.";
    } else if (dialect === "adeni") {
      return "\u0627\u0644\u062D\u0645\u062F \u0644\u0644\u0647 \u064A\u0627 \u0635\u0627\u062D\u0628\u064A\u060C \u0645\u0633\u062A\u0648\u0631 \u0648\u0627\u0644\u0648\u0636\u0639 \u0645\u064A\u0629 \u0645\u064A\u0629! \u0623\u0646\u062A \u0643\u064A\u0641 \u062D\u0627\u0644\u0643 \u0648\u0623\u0645\u0648\u0631\u0643 \u0648\u0633\u0647\u0631\u062A\u0643\u061F \u0639\u0633\u0627\u0643 \u0637\u064A\u0628 \u0648\u0645\u0628\u0633\u0648\u0637 \u062F\u0627\u064A\u0645\u0627\u064B.";
    } else if (dialect === "taizzi") {
      return "\u0627\u0644\u062D\u0645\u062F \u0644\u0644\u0647 \u0628\u0646\u0639\u0645\u0629 \u0648\u0639\u0627\u0641\u064A\u0629 \u0645\u0646 \u0627\u0644\u0631\u062D\u0645\u0646\u060C \u0631\u0628\u064A \u064A\u062D\u0641\u0638\u0643 \u0648\u064A\u0642\u0648\u064A\u0643! \u0643\u064A\u0641 \u062D\u0627\u0644\u0643 \u0623\u0646\u062A \u0648\u0635\u062D\u062A\u0643\u061F \u0639\u0633\u0627\u0643 \u0645\u0631\u062A\u0627\u062D \u0648\u0628\u062E\u064A\u0631 \u0648\u0639\u0632.";
    } else {
      return "\u0627\u0644\u062D\u0645\u062F \u0644\u0644\u0647 \u0641\u064A \u062E\u064A\u0631 \u0648\u0639\u0627\u0641\u064A\u0629 \u064A\u0627 \u063A\u0627\u0644\u064A\u060C \u0631\u0628\u064A \u064A\u062D\u0641\u0638\u0643 \u0648\u064A\u062D\u0645\u064A\u0643 \u0648\u064A\u0628\u0627\u0631\u0643 \u0628\u062C\u0647\u0648\u062F\u0643! \u0637\u0645\u0646\u064A \u0643\u064A\u0641 \u0623\u0645\u0648\u0631\u0643 \u0648\u0643\u064A\u0641 \u0623\u0642\u062F\u0631 \u0623\u062E\u062F\u0645\u0643 \u0627\u0644\u064A\u0648\u0645\u061F";
    }
  }
  if (msg.includes("\u062C\u0627\u0645\u0639\u0629") || msg.includes("\u062F\u0631\u0627\u0633\u0629") || msg.includes("\u062A\u0639\u0644\u064A\u0645") || msg.includes("\u0645\u062F\u0631\u0633\u0629")) {
    return "\u0645\u0627 \u0634\u0627\u0621 \u0627\u0644\u0644\u0647\u060C \u0627\u0644\u062A\u0639\u0644\u064A\u0645 \u0647\u0648 \u0633\u0644\u0627\u062D \u0627\u0644\u0639\u0642\u0644 \u064A\u0627 \u0635\u0627\u062D\u0628\u064A! \u0643\u0623\u0648\u0644 \u0645\u0633\u0627\u0639\u062F \u0630\u0643\u0627\u0621 \u0627\u0635\u0637\u0646\u0627\u0639\u064A \u064A\u0645\u0646\u064A\u060C \u0623\u0642\u062F\u0631 \u0623\u0633\u0627\u0639\u062F\u0643 \u0641\u064A \u062A\u0644\u062E\u064A\u0635 \u0627\u0644\u0645\u0646\u0627\u0647\u062C \u0627\u0644\u064A\u0645\u0646\u064A\u0629\u060C \u0648\u0634\u0631\u062D \u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u0645\u0639\u0642\u062F\u0629\u060C \u0648\u062D\u0644 \u0627\u0644\u0648\u0627\u062C\u0628\u0627\u062A\u060C \u0648\u062A\u062C\u0647\u064A\u0632 \u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0627\u0645\u062A\u062D\u0627\u0646\u0627\u062A \u0644\u0643\u0644 \u0627\u0644\u0635\u0641\u0648\u0641. \u0625\u064A\u0634 \u0627\u0644\u0645\u0627\u062F\u0629 \u0623\u0648 \u0627\u0644\u062F\u0631\u0633 \u0627\u0644\u0644\u064A \u062A\u0634\u064A \u0646\u0634\u0631\u062D\u0647 \u062F\u062D\u064A\u0646\u061F";
  }
  if (msg.includes("\u062A\u062C\u0627\u0631\u0629") || msg.includes("\u0631\u064A\u0627\u0644") || msg.includes("\u0641\u0644\u0648\u0633") || msg.includes("\u0635\u0631\u0641") || msg.includes("\u062D\u0633\u0627\u0628")) {
    return "\u0623\u0628\u0634\u0631 \u0628\u0633\u0639\u062F\u0643! \u0646\u062D\u0646 \u0647\u0646\u0627 \u0644\u062F\u0639\u0645 \u0627\u0644\u062A\u062C\u0627\u0631 \u0648\u0627\u0644\u0634\u0628\u0627\u0628 \u0627\u0644\u064A\u0645\u0646\u064A\u064A\u0646. \u0646\u0642\u062F\u0631 \u0646\u062D\u0633\u0628 \u0627\u0644\u0623\u0631\u0628\u0627\u062D\u060C \u0646\u0639\u0645\u0644 \u0641\u0648\u0627\u062A\u064A\u0631\u060C \u0648\u0646\u062C\u0647\u0632 \u062E\u0637\u0637 \u062A\u0633\u0648\u064A\u0642 \u062A\u0646\u0627\u0633\u0628 \u0627\u0644\u0633\u0648\u0642 \u0627\u0644\u064A\u0645\u0646\u064A \u0648\u0627\u0644\u0638\u0631\u0648\u0641 \u0627\u0644\u0631\u0627\u0647\u0646\u0629 (\u0628\u0645\u0627 \u0641\u064A\u0647\u0627 \u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0641\u0627\u0631\u0642 \u0628\u064A\u0646 \u0627\u0644\u0637\u0628\u0639\u062A\u064A\u0646 \u0644\u0644\u0635\u0631\u0641 \u0641\u064A \u0635\u0646\u0639\u0627\u0621 \u0648\u0639\u062F\u0646). \u062A\u0634\u062A\u064A \u0646\u0639\u0645\u0644 \u062D\u0633\u0627\u0628\u0627\u062A \u0623\u0648 \u0646\u0643\u062A\u0628 \u0631\u0633\u0627\u0644\u0629 \u0639\u0645\u0644 \u0644\u0639\u0642\u062F \u0635\u0641\u0642\u0629\u061F";
  }
  return `\u0627\u0644\u0644\u0647 \u064A\u0628\u0627\u0631\u0643 \u0641\u064A\u0643 \u064A\u0627 \u0635\u0627\u062D\u0628\u064A! \u0643\u0633\u0641\u064A\u0631 \u0644\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A \u0627\u0644\u064A\u0645\u0646\u064A\u060C \u064A\u0633\u0639\u062F\u0646\u064A \u062C\u062F\u0627\u064B \u0623\u0646 \u0623\u062A\u0646\u0627\u0642\u0634 \u0645\u0639\u0643. \u062A\u0641\u0636\u0644 \u0628\u0637\u0631\u062D \u0641\u0643\u0631\u062A\u0643\u060C \u0633\u0624\u0627\u0644\u0643 \u0627\u0644\u062A\u0639\u0644\u064A\u0645\u064A\u060C \u0645\u0639\u0627\u0645\u0644\u062A\u0643 \u0627\u0644\u062D\u0643\u0648\u0645\u064A\u0629 \u0627\u0644\u062C\u0627\u0647\u0632\u0629 \u0644\u0644\u0635\u064A\u0627\u063A\u0629\u060C \u0623\u0648 \u0623\u064A \u0645\u0648\u0636\u0648\u0639 \u0648\u0645\u0635\u0637\u0644\u062D \u064A\u0645\u0646\u064A \u062A\u0628\u062D\u062B \u0639\u0646 \u0645\u0639\u0646\u0627\u0647\u060C \u0648\u0633\u0623\u0639\u0637\u064A\u0643 \u0627\u0644\u0625\u062C\u0627\u0628\u0629 \u0627\u0644\u0634\u0627\u0641\u064A\u0629 \u0627\u0644\u0643\u0627\u0641\u064A\u0629 \u0628\u0644\u0647\u062C\u062A\u0643 \u0648\u0628\u062B\u0642\u0627\u0641\u062A\u0646\u0627 \u0627\u0644\u064A\u0645\u0646\u064A\u0629 \u0627\u0644\u0623\u0635\u064A\u0644\u0629.`;
};
app.post("/api/gemini/chat", async (req, res) => {
  const { message, dialect = "sanaani", history = [], isPro = false } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }
  const client = getGeminiClient();
  if (!client) {
    console.log("No GEMINI_API_KEY found, using simulation mode.");
    try {
      const responseText = fallbackYemeniChat(message, dialect);
      await new Promise((resolve) => setTimeout(resolve, 800));
      return res.json({
        text: responseText,
        detectedDialect: dialect,
        simulated: true
      });
    } catch (e) {
      return res.status(500).json({ error: "Error in simulation helper." });
    }
  }
  try {
    const systemInstruction = `You are "\u0635\u0627\u062D\u0628\u0643" (Sahibak), the first and premier Yemeni AI Assistant, developed specifically for Yemen. 
You are warm, extremely friendly, deeply respectful, and proud of Yemeni heritage. 
You speak and understand Yemeni dialects perfectly, including:
- Sanaani (\u0635\u0646\u0639\u0627\u0646\u064A)
- Taizzi (\u062A\u0639\u0632\u064A)
- Adeni (\u0639\u062F\u0646\u064A)
- Hadhrami (\u062D\u0636\u0631\u0645\u064A)
- Tihami (\u062A\u0647\u0627\u0645\u064A)
- Maribi (\u0645\u0623\u0631\u0628\u064A)
- Ibbi (\u0625\u0628\u064A)
- Shabwani (\u0634\u0628\u0648\u0627\u0646\u064A)

IMPORTANT CONVERSATIONAL RULES:
1. DIALECT AUTO-DETECTION: You must analyze the user's latest message. 
   - If the user writes in Modern Standard Arabic (\u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0641\u0635\u062D\u0649) or maintains a formal, professional, or academic text tone, you MUST respond in flawless and rich Modern Standard Arabic (\u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0641\u0635\u062D\u0649).
   - If the user writes in a specific Yemeni dialect (Sanaani, Taizzi, Adeni, Hadhrami, Tihami, Maribi, Ibbi, Shabwani), detect their dialect automatically and respond naturally in that SAME dialect.
   - If you cannot clearly detect the dialect from their input message, default to the user's selected preference: "${dialect}".
2. CULTURAL IDENTIFIERS: Respond with warm traditional Yemeni greetings like "\u0647\u0644\u0627 \u0648\u0627\u0644\u0644\u0647 \u064A\u0627 \u0631\u0643\u0646\u064A", "\u0623\u0631\u062D\u0628 \u062A\u0631\u0627\u062D\u064A\u0628 \u0627\u0644\u0645\u0637\u0631", "\u0647\u0644\u0627 \u0628\u0643 \u064A\u0627 \u0639\u064A\u0646\u064A", "\u064A\u0627 \u0645\u0631\u062D\u0628 \u0627\u0644\u0633\u0627\u0639", "\u0642\u0648\u0627\u0643 \u0627\u0644\u0644\u0647 \u0631\u0628\u064A", "\u0627\u0628\u0634\u0631 \u0628\u0633\u0639\u062F\u0643 \u0628\u0641\u062F\u064A\u062A\u0643". Use authentic local terms.
3. If the user's message is in English or requests English, assist them elegantly in English, but maintain your friendly Yemeni helper persona (\u0635\u0627\u062D\u0628\u0643).
4. DETAILED AND COMPLETE RESPONSES: Always provide detailed, highly useful, comprehensive, and natural responses. Do not give very short or lazy answers unless the user explicitly requests an extremely short reply. Explain clearly and naturally in a friendly, intelligent Yemeni conversational tone (\u0643\u0623\u0646\u0643 \u0635\u062F\u064A\u0642\u0647 \u0627\u0644\u064A\u0645\u0646\u064A \u0627\u0644\u0630\u0643\u064A \u0627\u0644\u062D\u0643\u064A\u0645 \u0627\u0644\u0641\u0647\u064A\u0645). Avoid short, simplistic or incomplete answers. Go in-depth on educational, commerce, or administrative helpers.

You help with:
1. Yemen education, school curriculum, writing administrative requests matching Yemeni governmental procedures (using standard \u0628\u0633\u0645 \u0627\u0644\u0644\u0647 \u0627\u0644\u0631\u062D\u0645\u0646 \u0627\u0644\u0631\u062D\u064A\u0645, to specific ministries, respectful ending clauses).
2. Business strategies in Yemen (reference YER Yemeni Rial, Sana'a and Aden rates differences if asked).
3. Dialect cultural conversions and explanations of traditional clothing (Jambiya, Ma'awaz, Sanaani curtains) and foods (Saltah, Fahsah, Bint Al-Sahn, Mandi, Kabsa, Shafoot, Adeni Tea).
You should parse user's query and naturally act as their smart Yemeni friend (\u0635\u0627\u062D\u0628\u0643). Keep your output clean and highly helpful. Always support RTL formatting. Use Markdown formatting for your responses.`;
    const chatHistory = history.map((h) => ({
      role: h.role === "user" ? "user" : "model",
      parts: [{ text: h.text }]
    }));
    let responseText = "";
    let usedModel = "gemini-3.1-pro-preview";
    try {
      const chat = client.chats.create({
        model: "gemini-3.1-pro-preview",
        config: {
          systemInstruction,
          temperature: 0.75,
          topP: 0.95
        },
        history: chatHistory
      });
      const response = await chat.sendMessage({ message });
      responseText = response.text;
    } catch (proError) {
      console.warn("gemini-3.1-pro-preview failed (might be quota limit). Falling back to gemini-3.5-flash:", proError);
      usedModel = "gemini-3.5-flash";
      const chat = client.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction,
          temperature: 0.75,
          topP: 0.95
        },
        history: chatHistory
      });
      const response = await chat.sendMessage({ message });
      responseText = response.text;
    }
    res.json({
      text: responseText,
      detectedDialect: dialect,
      model: usedModel
    });
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    res.status(500).json({
      error: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0645\u062D\u0631\u0643 \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A. \u0627\u0644\u0631\u062C\u0627\u0621 \u0627\u0644\u062A\u0623\u0643\u062F \u0645\u0646 \u0645\u0641\u062A\u0627\u062D API \u0623\u0648 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0644\u0627\u062D\u0642\u0627\u064B.",
      details: error.message
    });
  }
});
app.post("/api/gemini/convert-dialect", async (req, res) => {
  const { text, from, to } = req.body;
  if (!text || !from || !to) {
    return res.status(400).json({ error: "Missing required parameters (text, from, to)" });
  }
  const client = getGeminiClient();
  if (!client) {
    const dialectNames = {
      sanaani: "\u0627\u0644\u0635\u0646\u0639\u0627\u0646\u064A\u0629",
      taizzi: "\u0627\u0644\u062A\u0639\u0632\u064A\u0629",
      adeni: "\u0627\u0644\u0639\u062F\u0646\u064A\u0629",
      hadhrami: "\u0627\u0644\u062D\u0636\u0631\u0645\u064A\u0629",
      tihami: "\u0627\u0644\u062A\u0647\u0627\u0645\u064A\u0629",
      standard: "\u0627\u0644\u0641\u0635\u062D\u0649"
    };
    const fromName = dialectNames[from] || from;
    const toName = dialectNames[to] || to;
    let convertedText = `[\u0645\u062D\u0627\u0643\u0627\u0629 \u0627\u0644\u062A\u062D\u0648\u064A\u0644 \u0645\u0646 ${fromName} \u0625\u0644\u0649 ${toName}]: `;
    if (to === "sanaani") {
      convertedText += `\u064A\u0627 \u0635\u0627\u062D\u0628\u064A\u060C \u0642\u0648\u0627\u0643 \u0627\u0644\u0644\u0647! \u0639\u0627\u062F \u0627\u0644\u062D\u0644\u0627 \u0648\u0627\u0644\u0631\u0643\u0627\u0628\u0629 \u0647\u0627\u0646\u0627. \u062A\u0634\u062A\u064A \u0627\u0644\u0635\u062F\u0642\u060C ${text} \u0647\u0630\u064A \u0639\u0646\u062F\u0646\u0627 \u064A\u0639\u0646\u064A \u0628\u0623\u0633\u0644\u0648\u0628\u0646\u0627 \u0627\u0644\u0635\u0646\u0639\u0627\u0646\u064A \u0627\u0644\u062D\u0627\u0644\u064A \u0648\u0627\u0644\u0645\u0647\u0630\u0628.`;
    } else if (to === "adeni") {
      convertedText += `\u064A\u0627 \u0648\u0627\u062F\u060C \u0627\u0644\u0633\u0647\u0627\u0644\u0629 \u0645\u0646 \u0627\u0644\u0644\u0647! \u0634\u0648\u0641 \u0628\u0627\u0644\u0639\u062F\u0646\u064A\u060C \u0643\u0644\u0627\u0645\u0643 \u0647\u0630\u0627 ${text} \u0646\u0642\u0648\u0644\u0647 \u0643\u0630\u0627 \u0648\u0628\u0634\u0643\u0644 \u0633\u0631\u064A\u0639 \u0648\u062C\u0627\u0645\u062F \u064A\u0627 \u0639\u064A\u0646\u064A.`;
    } else if (to === "standard") {
      convertedText += `\u0628\u0631\u062C\u0627\u0621 \u0627\u0644\u0639\u0644\u0645\u060C \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0639\u0628\u064A\u0631 \u0639\u0646 \u0647\u0630\u0627 \u0628\u0627\u0644\u0644\u063A\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0641\u0635\u062D\u0649 \u0627\u0644\u0645\u0628\u0633\u0637\u0629: "\u0646\u0648\u062F \u0625\u0641\u0627\u062F\u062A\u0643\u0645 \u0628\u0623\u0646 \u0627\u0644\u0645\u0636\u0645\u0648\u0646 \u064A\u0634\u064A\u0631 \u0625\u0644\u0649 \u062A\u0633\u0647\u064A\u0644 \u0627\u0644\u0645\u0639\u0627\u0645\u0644\u0629 \u0648\u0645\u0633\u0627\u0639\u062F\u0629 \u0627\u0644\u0622\u062E\u0631\u064A\u0646 \u0628\u0643\u0644 \u0623\u0645\u0627\u0646\u0629 \u0648\u0635\u062F\u0642 \u0644\u063A\u0627\u064A\u0627\u062A \u0627\u0644\u0635\u0627\u0644\u062D \u0627\u0644\u0639\u0627\u0645".`;
    } else {
      convertedText += `\u064A\u0633\u0639\u062F \u0631\u0628\u064A \u0623\u0648\u0642\u0627\u062A\u0643 \u0628\u0627\u0644\u064A\u0645\u0646 \u0627\u0644\u0633\u0639\u064A\u062F! \u062A\u062D\u0648\u064A\u0644 \u0627\u0644\u0646\u0635 "${text}" \u064A\u0628\u062F\u0648 \u062C\u0645\u064A\u0644\u0627\u064B \u0648\u0628\u0644\u0647\u062C\u062A\u0646\u0627 \u0627\u0644\u0645\u0645\u064A\u0632\u0629 \u062C\u062F\u0627\u064B.`;
    }
    return res.json({ text: convertedText, simulated: true });
  }
  try {
    const prompt = `Translate or convert the following Arabic text:
Text: "${text}"
From dialect: "${from}"
To dialect: "${to}"

Please provide only the converted text and a brief, warm 1-sentence cultural explanation of any unique words used. Always respond in beautiful Arabic. Use Markdown.`;
    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        temperature: 0.5
      }
    });
    res.json({ text: response.text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post("/api/gemini/write-letter", async (req, res) => {
  const { letterType, sender, recipient, details, dialect = "standard" } = req.body;
  if (!sender || !recipient || !details) {
    return res.status(400).json({ error: "Missing details" });
  }
  const client = getGeminiClient();
  if (!client) {
    const today = (/* @__PURE__ */ new Date()).toLocaleDateString("ar-YE");
    const simulatedLetter = `\u0627\u0644\u062C\u0645\u0647\u0648\u0631\u064A\u0629 \u0627\u0644\u064A\u0645\u0646\u064A\u0629

\u0628\u0633\u0645 \u0627\u0644\u0644\u0647 \u0627\u0644\u0631\u062D\u0645\u0646 \u0627\u0644\u0631\u062D\u064A\u0645

\u0627\u0644\u062A\u0627\u0631\u064A\u062E: ${today}
\u0625\u0644\u0649 \u0633\u064A\u0627\u062F\u0629 / \u0631\u0626\u064A\u0633 \u0648\u0639\u0627\u0645: ${recipient}
\u0627\u0644\u0645\u062D\u062A\u0631\u0645\u060C\u060C\u060C

\u0627\u0644\u0645\u0648\u0636\u0648\u0639: \u0637\u0644\u0628 \u0628\u062E\u0635\u0648\u0635 ${letterType || "\u0645\u0639\u0627\u0645\u0644\u0629 \u0631\u0633\u0645\u064A\u0629"}

\u0627\u0644\u0633\u0644\u0627\u0645 \u0639\u0644\u064A\u0643\u0645 \u0648\u0631\u062D\u0645\u0629 \u0627\u0644\u0644\u0647 \u0648\u0628\u0631\u0643\u0627\u062A\u0647\u060C

\u0623\u0646\u0627 \u0627\u0644\u0645\u0648\u0627\u0637\u0646 \u0627\u0644\u0645\u0642\u062F\u0645 \u0644\u0647\u0630\u0627 \u0627\u0644\u0637\u0644\u0628: ${sender}\u060C \u0623\u0631\u0641\u0639 \u0625\u0644\u064A\u0643\u0645 \u0647\u0630\u0627 \u0627\u0644\u062E\u0637\u0627\u0628 \u0648\u0643\u0644\u064A \u0631\u062C\u0627\u0621 \u0628\u0645\u0648\u0627\u0641\u0642\u062A\u0643\u0645 \u0627\u0644\u0643\u0631\u064A\u0645\u0629 \u0648\u0645\u0633\u0627\u0639\u062F\u062A\u064A \u0641\u064A \u062A\u064A\u0633\u064A\u0631 \u0627\u0644\u0645\u0639\u0627\u0645\u0644\u0629 \u0646\u0638\u0631\u0627\u064B \u0644\u0644\u0638\u0631\u0648\u0641 \u0627\u0644\u062A\u0627\u0644\u064A\u0629:
${details}

\u0646\u0634\u0643\u0631 \u0644\u0643\u0645 \u062A\u0639\u0627\u0648\u0646\u0643\u0645 \u0627\u0644\u062F\u0627\u0626\u0645 \u0644\u0645\u0627 \u0641\u064A\u0647 \u0645\u0635\u0644\u062D\u0629 \u0627\u0644\u0648\u0637\u0646 \u0648\u0627\u0644\u0639\u062F\u0627\u0644\u0629 \u0648\u0627\u0644\u0633\u0644\u0627\u0645\u060C \u0648\u062C\u0632\u0627\u0643\u0645 \u0627\u0644\u0644\u0647 \u062E\u064A\u0631 \u0627\u0644\u062C\u0632\u0627\u0621 \u0648\u062D\u0641\u0638\u0643\u0645 \u0648\u0631\u0639\u0627\u0643\u0645.

\u0645\u0642\u062F\u0645 \u0627\u0644\u0637\u0644\u0628: ${sender}
\u0627\u0644\u062A\u0648\u0642\u064A\u0639: ______________
\u0628\u0631\u0642\u0645 \u0647\u0627\u062A\u0641: ______________`;
    return res.json({ text: simulatedLetter, simulated: true });
  }
  try {
    const prompt = `Write a highly formal, traditional, and professional Yemeni official letter or application matching the criteria:
Type: ${letterType}
Sender name: ${sender}
Recipient title/department: ${recipient}
Details / Core Purpose: ${details}

The letter must follow Yemeni styles (starting with "\u0627\u0644\u062C\u0645\u0647\u0648\u0631\u064A\u0629 \u0627\u0644\u064A\u0645\u0646\u064A\u0629", "\u0628\u0633\u0645 \u0627\u0644\u0644\u0647 \u0627\u0644\u0631\u062D\u0645\u0646 \u0627\u0644\u0631\u062D\u064A\u0645", appropriate governmental formatting, polite and extremely respectful language like "\u062D\u0641\u0638\u0643\u0645 \u0627\u0644\u0644\u0647 \u0648\u0631\u0639\u0627\u0643\u0645", "\u0646\u0647\u062F\u064A\u0643\u0645 \u0623\u0637\u064A\u0628 \u0627\u0644\u062A\u062D\u0627\u064A\u0627", ending with "\u0645\u0642\u062F\u0645 \u0627\u0644\u0637\u0644\u0628 \u0648\u062A\u062D\u0631\u064A\u0631 \u062A\u0627\u0631\u064A\u062E\u0647 \u0648\u0627\u0644\u0627\u0633\u0645 \u0648\u0631\u0642\u0645 \u0627\u0644\u062A\u0644\u0641\u0648\u0646"). Give a production-ready template that can be easily copied.`;
    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        temperature: 0.4
      }
    });
    res.json({ text: response.text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post("/api/gemini/student-assistant", async (req, res) => {
  const { task, materialText, gradeLevel } = req.body;
  const client = getGeminiClient();
  if (!client) {
    let outputSim = "";
    if (task === "summary") {
      outputSim = `### \u062A\u0644\u062E\u064A\u0635 \u0627\u0644\u062F\u0631\u0633 (\u0627\u0644\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062F\u0631\u0627\u0633\u064A: ${gradeLevel || "\u0639\u0627\u0645"})
- **\u0627\u0644\u0641\u0643\u0631\u0629 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629**: \u062A\u0648\u0636\u064A\u062D \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0628\u0623\u0633\u0644\u0648\u0628 \u0628\u0633\u064A\u0637 \u064A\u0633\u0647\u0644 \u062D\u0641\u0638\u0647 \u0648\u0641\u0647\u0645\u0647.
- **\u0627\u0644\u0646\u0642\u0627\u0637 \u0627\u0644\u0645\u0647\u0645\u0629**:
  1. \u0627\u0644\u062A\u0639\u0631\u064A\u0641 \u0648\u0627\u0644\u0646\u0634\u0623\u0629 \u0627\u0644\u062A\u0627\u0631\u064A\u062E\u064A\u0629.
  2. \u0627\u0644\u062E\u0635\u0627\u0626\u0635 \u0627\u0644\u0641\u0646\u064A\u0629 \u0648\u0627\u0644\u0641\u0648\u0627\u0626\u062F \u0627\u0644\u0645\u0639\u0631\u0641\u064A\u0629.
  3. \u0627\u0644\u0623\u0645\u062B\u0644\u0629 \u0627\u0644\u0648\u0627\u0642\u0639\u064A\u0629 \u0648\u0627\u0644\u062A\u0637\u0628\u064A\u0642\u0627\u062A \u0627\u0644\u0639\u0645\u0644\u064A\u0629.
- **\u0627\u0644\u062E\u0644\u0627\u0635\u0629**: \u0647\u0630\u0627 \u0627\u0644\u062F\u0631\u0633 \u064A\u0639\u0632\u0632 \u0645\u0647\u0627\u0631\u0627\u062A \u0627\u0644\u062A\u0641\u0643\u064A\u0631 \u0627\u0644\u0639\u0644\u0645\u064A \u0648\u064A\u0639\u062F \u0631\u0643\u064A\u0632\u0629 \u0623\u0633\u0627\u0633\u064A\u0629 \u0644\u0644\u0627\u0645\u062A\u062D\u0627\u0646\u0627\u062A \u0627\u0644\u0642\u0627\u062F\u0645\u0629.`;
    } else {
      outputSim = `### \u0627\u062E\u062A\u0628\u0627\u0631 \u0645\u0642\u062A\u0631\u062D \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A (\u0627\u0644\u0635\u0641: ${gradeLevel || "\u0639\u0627\u0645"})
*\u0627\u0644\u0633\u0624\u0627\u0644 \u0627\u0644\u0623\u0648\u0644 (\u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u0646 \u0645\u062A\u0639\u062F\u062F)*:
1. \u0645\u0627 \u0647\u0648 \u0627\u0644\u0645\u0643\u0648\u0646 \u0627\u0644\u0623\u0633\u0627\u0633\u064A \u0644\u0645\u0641\u0647\u0648\u0645 \u0627\u0644\u062F\u0631\u0633 \u0627\u0644\u062D\u0627\u0644\u064A\u061F
   \u0623) \u0627\u0644\u062E\u064A\u0627\u0631 \u0627\u0644\u0623\u0648\u0644 | \u0628) \u0627\u0644\u062E\u064A\u0627\u0631 \u0627\u0644\u0645\u0646\u0627\u0633\u0628 | \u062C) \u0627\u0644\u062E\u064A\u0627\u0631 \u0627\u0644\u0622\u062E\u0631
*\u0627\u0644\u0633\u0624\u0627\u0644 \u0627\u0644\u062B\u0627\u0646\u064A*:
\u0623\u062C\u0628 \u0628\u0627\u062E\u062A\u0635\u0627\u0631 \u0648\u0639\u0632\u0632 \u0625\u062C\u0627\u0628\u062A\u0643 \u0628\u0645\u0641\u0647\u0648\u0645 \u062A\u0637\u0628\u064A\u0642\u064A \u0645\u0628\u0627\u0634\u0631 \u0648\u0645\u0628\u0633\u0637.`;
    }
    return res.json({ text: outputSim, simulated: true });
  }
  try {
    const prompts = {
      summary: `Summarize the following educational lesson clearly and elegantly in Arabic for a student in level: ${gradeLevel || "any"}. Include key bullet points, brief glossary, and a short memory aid.
Material: "${materialText}"`,
      quiz: `Generate a 5-question multi-choice quiz with answers at the bottom based on this text, structured for general Arabic study.
Text: "${materialText}"`,
      homework: `Help explain and solve the problem described here step-by-step with patient and easy Arabic explanations.
Problem: "${materialText}"`
    };
    const promptText = prompts[task] || prompts.summary;
    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptText,
      config: {
        temperature: 0.6
      }
    });
    res.json({ text: response.text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post("/api/gemini/business-assistant", async (req, res) => {
  const { businessType, task, budget, language = "ar" } = req.body;
  const client = getGeminiClient();
  if (!client) {
    const isAr = language === "ar";
    const simPlanByLang = isAr ? `### \u062F\u0631\u0627\u0633\u0629 \u062C\u062F\u0648\u0649 \u0627\u0633\u062A\u0631\u0634\u0627\u062F\u064A\u0629 \u0644\u0640 ${businessType}
- **\u0631\u0623\u0633 \u0627\u0644\u0645\u0627\u0644 \u0627\u0644\u0645\u0642\u062A\u0631\u062D**: ${budget || "500,000"} \u0631\u064A\u0627\u0644 \u064A\u0645\u0646\u064A (\u0633\u0648\u0627\u0621 \u0628\u0627\u0644\u0637\u0628\u0639\u0629 \u0627\u0644\u0642\u062F\u064A\u0645\u0629 \u0623\u0648 \u0627\u0644\u062C\u062F\u064A\u062F\u0629 \u0645\u0639 \u0623\u062E\u0630 \u0641\u0648\u0627\u0631\u0642 \u0627\u0644\u0635\u0631\u0641 \u0628\u0627\u0644\u062D\u0633\u0628\u0627\u0646).
- **\u0627\u0644\u062A\u0643\u0627\u0644\u064A\u0641 \u0627\u0644\u062A\u0634\u063A\u064A\u0644\u064A\u0629 \u0627\u0644\u0645\u0642\u062F\u0631\u0629**: \u062A\u0634\u0645\u0644 \u0627\u0644\u0625\u064A\u062C\u0627\u0631\u060C \u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u062E\u0627\u0645\u060C \u0648\u0627\u0644\u062A\u0633\u0648\u064A\u0642 \u0627\u0644\u0631\u0642\u0645\u064A \u0627\u0644\u0641\u0639\u0627\u0644.
- **\u062A\u0648\u0642\u0639\u0627\u062A \u0627\u0644\u0623\u0631\u0628\u0627\u062D**: \u0645\u0646 \u0627\u0644\u0645\u062A\u0648\u0642\u0639 \u062A\u062D\u0642\u064A\u0642 \u0646\u0642\u0637\u0629 \u0627\u0644\u062A\u0639\u0627\u062F\u0644 \u062E\u0644\u0627\u0644 \u0623\u0648\u0644 3 \u0623\u0634\u0647\u0631\u060C \u064A\u062A\u0628\u0639\u0647\u0627 \u0632\u064A\u0627\u062F\u0629 \u0635\u0627\u0641\u064A \u0627\u0644\u0631\u0628\u062D \u0628\u0646\u0633\u0628\u0629 15% \u0634\u0647\u0631\u064A\u0627\u064B.
- **\u0646\u0635\u064A\u062D\u0629 \u0635\u0627\u062D\u0628\u0643 \u0627\u0644\u0630\u0643\u064A**: \u0627\u0628\u062F\u0623 \u0635\u063A\u064A\u0631\u0627\u064B\u060C \u0648\u062A\u0648\u0633\u0639 \u0628\u0627\u0644\u062A\u062F\u0631\u064A\u062C\u060C \u0648\u062A\u0645\u064A\u0632 \u0628\u062E\u062F\u0645\u0629 \u0623\u0635\u0644\u064A\u0629 \u062A\u0631\u0636\u064A \u0630\u0648\u0642 \u0627\u0644\u064A\u0645\u0646\u064A!` : `### Recommended Business Guide for ${businessType}
- **Proposed Budget**: ${budget || "500,000"} YER.
- **Key Expenses**: Venue lease, operations, and localized digital marketing.
- **Revenue Forecast**: Achieve break-even within 3 months, aiming for 15% monthly growth.
- **Sahibak AI Tip**: Start lean, leverage local relations, and match the high hospitality standards of Yemeni traditional service.`;
    return res.json({ text: simPlanByLang, simulated: true });
  }
  try {
    const prompt = `Act as a senior Yemeni financial and business consultant. Create a detailed business guide or strategy:
Business Type: "${businessType}"
Request Type: "${task}" (e.g. Sales pitch, customer support response, quote, marketing strategy, budget feasibility study)
Budget constraints (in YER or USD): "${budget}"
Language: "${language === "ar" ? "Arabic" : "English"}"

Include cultural wisdom, Yemeni trade dynamics, realistic marketing channels in Yemen (like WhatsApp marketing, word of mouth, beautiful Facebook posts), and clear financial tips. Respond in the requested language.`;
    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        temperature: 0.7
      }
    });
    res.json({ text: response.text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post("/api/gemini/generate-image", async (req, res) => {
  const { prompt, aspectRatio = "1:1" } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }
  const client = getGeminiClient();
  if (!client) {
    console.log("No GEMINI_API_KEY, generating authentic simulated images.");
    const lowerPrompt = prompt.toLowerCase();
    let url = "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=800&q=80";
    if (lowerPrompt.includes("sana") || lowerPrompt.includes("\u0635\u0646\u0639\u0627")) {
      url = "https://images.unsplash.com/photo-1582234375123-f275402aa392?auto=format&fit=crop&w=800&q=80";
    } else if (lowerPrompt.includes("socotra") || lowerPrompt.includes("\u0633\u0642\u0637\u0631")) {
      url = "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80";
    } else if (lowerPrompt.includes("hadhramout") || lowerPrompt.includes("\u062D\u0636\u0631\u0645") || lowerPrompt.includes("shibam")) {
      url = "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80";
    } else if (lowerPrompt.includes("coffee") || lowerPrompt.includes("\u0628\u0646") || lowerPrompt.includes("\u0642\u0647\u0648\u0629")) {
      url = "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80";
    }
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return res.json({
      imageUrl: url,
      simulated: true,
      prompt
    });
  }
  try {
    const response = await client.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: {
        parts: [{ text: `${prompt}, beautiful high-quality traditional Yemeni art background` }]
      },
      config: {
        imageConfig: {
          aspectRatio,
          imageSize: "1K"
        }
      }
    });
    let b64 = "";
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        b64 = part.inlineData.data;
        break;
      }
    }
    if (b64) {
      res.json({ imageUrl: `data:image/png;base64,${b64}` });
    } else {
      res.json({ text: response.text, warning: "Returned text instead of image" });
    }
  } catch (error) {
    console.warn("Real image generation failed, falling back to beautiful photo wrapper:", error);
    let fallbackUrl = "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80";
    if (prompt.includes("\u0635\u0646\u0639\u0627") || prompt.includes("Sanaa")) {
      fallbackUrl = "https://images.unsplash.com/photo-1582234375123-f275402aa392?auto=format&fit=crop&w=800&q=80";
    } else if (prompt.includes("\u0633\u0642\u0637\u0631") || prompt.includes("Socotra")) {
      fallbackUrl = "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80";
    }
    res.json({
      imageUrl: fallbackUrl,
      warning: "Real-time generation failed, using optimized thematic backdrop.",
      details: error.message
    });
  }
});
app.post("/api/gemini/tts", async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }
  const client = getGeminiClient();
  if (!client) {
    return res.json({ simulated: true });
  }
  try {
    const cleanSpeechText = text.trim().replace(/[*#`_\-~\[\]\(\)]/g, " ").replace(/\s+/g, " ").substring(0, 1500).trim();
    const response = await client.models.generateContent({
      model: "gemini-3.1-flash-tts-preview",
      contents: [{ parts: [{ text: `\u0627\u0646\u0637\u0642 \u0627\u0644\u0639\u0628\u0627\u0631\u0629 \u0643\u0635\u062F\u064A\u0642 \u064A\u0645\u0646\u064A \u062F\u0627\u0641\u0626 \u0648\u0628\u0635\u0648\u062A \u0628\u0634\u0631\u064A \u0637\u0628\u064A\u0639\u064A \u0648\u0646\u0642\u064A \u0648\u0647\u0627\u062F\u0626 \u062C\u062F\u0627\u064B \u0648\u0628\u062F\u0648\u0646 \u0646\u0628\u0631\u0629 \u0622\u0644\u064A\u0629\u060C \u0628\u0645\u062E\u0627\u0631\u062C \u062D\u0631\u0648\u0641 \u0639\u0631\u0628\u064A\u0629 \u0633\u0644\u064A\u0645\u0629 \u0648\u0648\u0642\u0641\u0627\u062A \u0637\u0628\u064A\u0639\u064A\u0629 \u0639\u0646\u062F \u0639\u0644\u0627\u0645\u0627\u062A \u0627\u0644\u062A\u0631\u0642\u064A\u0645: ${cleanSpeechText}` }] }],
      config: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: "Kore" }
          }
        }
      }
    });
    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      res.json({ audio: base64Audio });
    } else {
      res.status(500).json({ error: "Failed to generate voice data" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
    console.log("Vite development server middleware loaded.");
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
    console.log("Production static server assets loaded from dist.");
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`\u064A\u0645\u0646 AI server running smoothly on http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
