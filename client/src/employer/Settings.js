import React from "react";
import ShortlistingSettingsAccordion from "../admin/components/ShortlistingSettingsAccordion";
import AccountSettingsAccordion from "./Settings/AccountSettingsAccordion";
import VerificationSettingsAccordion from "./Settings/VerificationSettingsAccordion";
import UserSettingsAccordion from "./Settings/UserSettingsAccordion";

function Settings() {
  return (
    <div style={{ padding: 12, width: "100%", textAlign: "left" }}>
      <UserSettingsAccordion />
      <ShortlistingSettingsAccordion />
      <VerificationSettingsAccordion />
      <AccountSettingsAccordion />
    </div>
  );
}

export default Settings;
