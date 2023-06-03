import React from "react";
import "./tandpStyles.css";

export default function TermsandPrivcay() {
  document.title = "Todo - Terms and Privacy policy";
  return (
    <>
      <html>
        <head></head>
        <body>
          <h1>Terms of Service</h1>
          <ol>
            <li>
              <p>Acceptance of Terms:</p>
              <ul>
                <li>
                  By using our Todo List app and enabling the backup feature,
                  you agree to comply with these Terms of Service.
                </li>
              </ul>
            </li>
            <li>
              <p>Backup and Restore Feature:</p>
              <ul>
                <li>
                  Our app offers a backup feature that allows you to link your
                  Google account and automatically write the content of your
                  todo list to a Google Doc.
                </li>
                <li>
                  By enabling the backup feature, you grant our app permission
                  to access and use your Google account's access token for the
                  purpose of performing the backup and restore functionality.
                </li>
              </ul>
            </li>
            <li>
              <p>User Responsibilities:</p>
              <ul>
                <li>
                  You are solely responsible for linking your Google account and
                  providing a valid access token.
                </li>
                <li>
                  You understand that the backup feature allows for restoring
                  data from Google Docs to the web application, and any actions
                  performed using the restore functionality will affect your
                  data in the app.
                </li>
              </ul>
            </li>
            <li>
              <p>Account Suspension or Termination:</p>
              <ul>
                <li>
                  We reserve the right to suspend or terminate your access to
                  the backup and restore feature or the entire app if we suspect
                  any unauthorized or malicious use of your Google account
                  access token or violation of these Terms of Service.
                </li>
              </ul>
            </li>
          </ol>

          <h1>Privacy Policy</h1>
          <ol>
            <li>
              <p>Information Collection and Use:</p>
              <ul>
                <li>
                  We collect and use the access token of your Google account
                  solely for the purpose of performing the backup and restore
                  feature.
                </li>
                <li>
                  We do not store the access token after its initial use and
                  immediately delete it from our system.
                </li>
              </ul>
            </li>
            <li>
              <p>Data Storage and Security:</p>
              <ul>
                <li>
                  We take reasonable measures to protect the security and
                  confidentiality of your data, including your access token and
                  the content of your todo list.
                </li>
                <li>
                  Your backup data stored in Google Docs is subject to Google's
                  security measures and policies.
                </li>
              </ul>
            </li>
            <li>
              <p>Third-Party Services:</p>
              <ul>
                <li>
                  Our app integrates with Google Docs for the backup and restore
                  feature.
                </li>
                <li>
                  By enabling the backup feature, you acknowledge that your data
                  will be stored and processed by Google Docs, subject to
                  Google's Privacy Policy.
                </li>
              </ul>
            </li>
            <li>
              <p>Data Sharing and Disclosure:</p>
              <ul>
                <li>
                  We will not share your access token or backup data with any
                  third parties, except as required by law.
                </li>
                <li>
                  We may share non-personally identifiable information for
                  analytics or improvement purposes.
                </li>
              </ul>
            </li>
            <li>
              <p>Cookies:</p>
              <ul>
                <li>
                  Our app may use cookies or similar technologies to enhance
                  your experience and collect information about how you use our
                  app.
                </li>
              </ul>
            </li>
            <li>
              <p>Changes to the Privacy Policy:</p>
              <ul>
                <li>
                  We reserve the right to modify this Privacy Policy at any
                  time. We will notify you of any significant changes through
                  the app or via email.
                </li>
              </ul>
            </li>
          </ol>
        </body>
      </html>
    </>
  );
}
