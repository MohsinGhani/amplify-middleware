"use client";

import { Box, Theme, SxProps, Typography, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";

import theme from "../../components/helpers/Theme";
import SubmissionTabs from "@/components/SubmissionTabs";
import DownloadBtn from "@/components/DownloadButton";
import SubmitForm from "@/components/SubmitForm";
import ContactForm from "@/components/ContactForm";

const Page = () => {
  const [selectedTab, setSelectedTab] = useState<any>(0);

  const tabs = [
    { id: 0, label: "Music" },
    { id: 1, label: "Producer/Prod. Company" },
    { id: 2, label: "Talents" },
    { id: 3, label: "Show Ideas" },
    { id: 4, label: "Contact Support" },
  ];

  const handleChange = (event: any, newValue: any) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.tabContainer}>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={styles.tabs}
        >
          {(tabs || []).map((tab) => (
            <Tab
              label={tab.label}
              sx={
                selectedTab === tab.id
                  ? {
                      ...styles.tab,
                      color: "var(--white)",
                      transform: "scale(0.98)",
                    }
                  : styles.tab
              }
            />
          ))}
        </Tabs>
      </Box>
      <Box sx={styles.tabwrapper}>
        <SubmissionTabs value={selectedTab} index={0}>
          <Box sx={styles.content}>
            <Typography sx={styles.heading} variant="h6">
              GET YOUR MUSIC VIDEOS ON NOIRETV SPOTLIGHT
            </Typography>
            <Typography sx={styles.text}>
              Would you like to get your music video on NOIRETV? Spotlight on
              NOIRETV is a weekly co-sign of the best up-and-coming artists,
              actors and movie directors. E-mail a link of your music video or
              film to{" "}
              <a href="mail:support@caspenmedia.com">
                <span>support@caspenmedia.com</span>
              </a>{" "}
              for a chance to be featured or upload your videos on NoireTV for a
              chance to be featured NoireTV Spotlight.
            </Typography>
            <Typography sx={styles.text}>
              Follow these simple steps: <br />
              1. Firstly, send a YouTube Link for viewing and approval purposes
              to{" "}
              <a href="mail:support@caspenmedia.com">
                <span>support@caspenmedia.com</span>
              </a>{" "}
              <br />
              2. If your video is successfully selected, you will then be
              contacted and supplied with further instructions for delivery.
              <br />
              3. Please also download and complete the NoireTV Technical
              Requirement For NoireTV Music Videos as well as the NoireTV
              Submission Form.
            </Typography>
            <Box sx={styles.btn}>
              <DownloadBtn />
            </Box>
          </Box>
          <SubmitForm />
        </SubmissionTabs>

        <SubmissionTabs value={selectedTab} index={1}>
          <Box sx={styles.content}>
            <Typography sx={styles.heading} variant="h6">
              PRODUCER AND PRODUCTION COMPANY GUIDELINES
            </Typography>
            <Typography sx={styles.text}>
              To make us aware of your production company or your production
              experience you must: <br />
              <br />
              Be a seasoned producer or own a production company with credits.
              NoireTV is looking for experienced producers and production
              companies who have produced and delivered shows for network
              television, cable networks or local stations. Although we are open
              to working with a wide range of production companies, the
              producer’s background and skills are paramount.
              <br />
              <br />
              Send a one page letter of inquiry with contact information and
              area of interest to the address below. If you are an individual
              producer, include a copy of your personal credits. If you are a
              production company, include a copy of your company credits and a
              resume or bio of your company principals. Please DO NOT include
              any show ideas as we are legally unable to review the ideas and
              will have to return all materials unread.
              <br />
              <br />
              If your experience or your production company background meets our
              requirements, we will contact you for further information. At that
              time, we will request a demo reel of your work and at least one
              produced show/episode. Please wait until NoireTV contacts you. Due
              to the large volume of interest that we’ve received, this step is
              necessary to ensure that we are able to review all inquiries.
              <br />
              <br />
              If the produced show/episode is unaired filmed material, you will
              be required to sign a legal agreement to protect the rights of
              both parties. This submission release form, provided by NoireTV,
              must be signed prior to the sharing of such materials. <br />
              <br />
              If we are interested in working with you or your production
              company, we will contact you. Submitted materials will not be
              returned.
              <br />
              <br />
              <br />
              Inquiries should be sent to:
              <br />
              Attention: Programming/ Producer Inquiries
              <br />
              <br />
              NoireTV
              <br />
              PO Box 7533
              <br />
              Silver Spring, MD 20907, USA
              <br />
              <br />
            </Typography>
            <Box sx={styles.btn}>
              <DownloadBtn />
            </Box>
          </Box>
          <SubmitForm />
        </SubmissionTabs>

        <SubmissionTabs value={selectedTab} index={2}>
          <Box sx={styles.content}>
            <Typography sx={styles.heading} variant="h6">
              ON-AIR TALENT GUIDELINES
            </Typography>
            <Typography sx={styles.text}>
              If you are an on-air talent with expertise as a reporter, TV
              personality, or have an area of expertise in entertainment
              programming, send your headshot, reel, and resume to{" "}
              <a href="mail:support@caspenmedia.com">
                <span>support@caspenmedia.com</span>
              </a>{" "}
              to the attention of the Talent & Casting Department. Also, be sure
              to periodically check Casting Calls for available opportunities.
              Submitted materials will not be returned. <br />
              <br />
              Casting Inquiries should be sent to:
              <br />
              Attention: Programming/ Producer Inquiries
              <br />
              <br />
              NoireTV
              <br />
              PO Box 7533
              <br />
              Silver Spring, MD 20907, USA
              <br />
              <br />
            </Typography>
            <Box sx={styles.btn}>
              <DownloadBtn />
            </Box>
          </Box>
          <SubmitForm />
        </SubmissionTabs>

        <SubmissionTabs value={selectedTab} index={3}>
          <Box sx={styles.content}>
            <Typography sx={styles.heading} variant="h6">
              SHOWCASE YOUR IDEAS ON NOIRETV
            </Typography>
            <Typography sx={styles.text}>
              If you have show ideas, download a copy of the NoireTV submission
              form and send it via email to{" "}
              <a href="mail:support@caspenmedia.com">
                <span>support@caspenmedia.com</span>
              </a>{" "}
              with a youtube link to your content.
              <br />
              <br />
            </Typography>
            <Box sx={styles.btn}>
              <DownloadBtn />
            </Box>
          </Box>
          <SubmitForm />
        </SubmissionTabs>
      </Box>
      <SubmissionTabs value={selectedTab} index={4}>
        <Box sx={styles.content}>
          <Typography sx={styles.heading} variant="h6">
            CONTACT SUPPORT
          </Typography>
          <Typography sx={styles.subheading}>
            When facing challenges, reaching out to our dedicated support team
            ensures prompt and expert assistance for your needs.
            <br />
            <br />
            <br />
          </Typography>
          <Typography sx={styles.text}>
            Inquiries should be sent to:
            <br />
            Attention: Programming/ Producer Inquiries
            <br />
            <br />
            NoireTV
            <br />
            PO Box 7533
            <br />
            Silver Spring, MD 20907, USA
            <br />
            <br />
            Email:{" "}
            <a href="mail:support@caspenmedia.com">
              <span>support@caspenmedia.com</span>
            </a>{" "}
            <br />
            <br />
            Phone:{" "}
            <a href="tel:+1-202-559-8295">
              <span>+1-202-559-8295</span>
            </a>{" "}
            <br />
            <br />
            <br />
            <br />
          </Typography>
        </Box>
        <ContactForm />
      </SubmissionTabs>
    </Box>
  );
};

export default Page;

/** @type {import("@mui/material").SxProps} */
const styles: { [key: string]: SxProps<Theme> } = {
  mainWrapper: (theme: Theme) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    p: "4rem 0 8rem 0",
    backgroundColor: "var(--whiteoverlay)",
    [theme.breakpoints.down("laptop")]: {
      height: "auto",
      p: "2rem 0 4rem 0",
    },
  }),
  container: {
    bgcolor: "background.paper",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    p: "0 0 4rem 0",
  },
  tabwrapper: {
    width: "70%",
    [theme.breakpoints.down("laptop")]: {
      width: "95%",
    },
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
  },
  tabContainer: {
    p: "0 2rem",
    [theme.breakpoints.down("laptop")]: {
      width: "100%",
      overflow: "hidden",
    },
  },
  tabs: {
    display: "flex",
    flexDirection: "row",
    p: "4rem 0 1rem 0",
    // [theme.breakpoints.down("tablet")]: {
    //   width: "auto",
    //   flexDirection: "column",
    // },
  },
  tab: {
    fontSize: "1.1rem",
    textTransform: "uppercase",
    fontWeight: "500",
    cursor: "pointer",
    width: "auto",
    transition: "all 0.3s ease-in-out",
  },
  heading: {
    color: "var(--black)",
    textAlign: "center",
    p: "2rem 0 1rem 0",
  },
  text: {
    color: "var(--black)",
    p: "1rem 0",
    [theme.breakpoints.down("laptop")]: {
      p: "0 1rem",
    },
  },
  btn: {
    display: "flex",
    justifyContent: "center",
    p: "2rem 0 4rem 0",
  },
};
