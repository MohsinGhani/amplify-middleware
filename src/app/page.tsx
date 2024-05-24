"use client";
import HeroSec from "@/components/Home/HeroSec";
import PricingSec from "@/components/Home/PricingSec";
import SocialFeeds from "@/components/Home/SocialFeeds";
import React from "react";

const Home: React.FC = () => {
  return (
    <div>
      <HeroSec />
      <PricingSec />
      <SocialFeeds />
    </div>
  );
};

export default Home;
