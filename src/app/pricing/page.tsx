"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StarIcon from "@mui/icons-material/StarBorder";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  List,
  ListItem,
  Typography,
  Theme,
  SxProps,
} from "@mui/material";

import { useAuth } from "@/context";
import CommonButton from "@/components/Shared/CommonButton";
import { Tier } from "@/shared/interfaces/interfaces";

function PricingPage() {
  const router = useRouter();
  const [tiers, setTiers] = useState<Tier[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const OneMonthPriceId = "price_1NxanaDdFTaoHTF7nWIqVI0o";
    const OneYearPriceId = "price_1NxanaDdFTaoHTF7xNXHPnOf";
    const ConcertsPriceId = "price_1NzhJnDdFTaoHTF7GEH4ynGI";

    const fetchedTiers: Tier[] = [
      {
        title: "Monthly",
        price: "0.99",
        priceId: OneMonthPriceId,
        unit_duration: "/mo",
        feature_list: [
          "access to Live TV",
          "access to Exclusive Shows",
          "access to Exclusive Movies",
          "24hrs support",
        ],
        buttonText: "Subscribe",
        buttonVariant: "outlined",
      },
      {
        title: "Yearly",
        subheader: "Most popular",
        price: "9.99",
        priceId: OneYearPriceId,
        unit_duration: "/yr",
        feature_list: [
          "access to Live TV",
          "access to Exclusive Shows",
          "access to Exclusive Movies",
          "24hrs support",
        ],
        buttonText: "Subscribe",
        buttonVariant: "contained",
      },
      {
        title: "Concerts",
        subheader: "Stream Concerts Live.",
        price: "4.99",
        priceId: ConcertsPriceId,
        feature_list: ["Online access to stream 1 concert"],
        buttonText: "Buy Pass",
        buttonVariant: "outlined",
      },
    ];

    setTiers(fetchedTiers);
  }, []);

  const handleSubscription = async (selectedTier: Tier) => {
    if (!user) {
      router.push("/login");
      return;
    }
  };

  return (
    <Box sx={styles.mainWrapper}>
      <Typography sx={{ textAlign: "center", mb: "4rem" }} variant="h4">
        Choose a plan
      </Typography>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier, index) => (
            <Grid
              item
              key={index}
              xs={12}
              sm={tier.title === "Concerts" ? 12 : 6}
              md={4}
            >
              <Card sx={styles.cards}>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  action={
                    tier.title === "Yearly" ? (
                      <StarIcon sx={styles.icon} />
                    ) : null
                  }
                  titleTypographyProps={{
                    align: "center",
                    color: "var(--black)",
                    fontWeight: "700",
                  }}
                  subheaderTypographyProps={{
                    align: "center",
                    color: "var(--black)",
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[300]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                      mb: 2,
                    }}
                  >
                    <Typography
                      sx={styles.txtWeight}
                      variant="h3"
                      color="text.primary"
                    >
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      {tier.unit_duration}
                    </Typography>
                  </Box>
                  <List>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "var(--black)", pl: "1rem" }}
                    >
                      This includes:
                    </Typography>
                    {tier.feature_list.map((line, index) => (
                      <ListItem key={index}>
                        <TaskAltIcon sx={styles.icon} />
                        <Typography
                          variant="subtitle2"
                          sx={{ color: "var(--black)", pl: "1rem" }}
                        >
                          {line}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
                <CardActions>
                  <CommonButton
                    onClick={() => handleSubscription(tier)}
                    fullWidth
                    variant={tier.buttonVariant}
                  >
                    {tier.buttonText}
                  </CommonButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default PricingPage;

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
  icon: {
    fill: "var(--black)",
  },
  cards: {
    transition: "all 0.6s ease-in-out",
    boxShadow: "2px 2px 4px var(--shadow)",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  txtWeight: {
    fontWeight: "500",
  },
};
