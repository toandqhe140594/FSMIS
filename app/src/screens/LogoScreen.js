import { Center, Image, PresenceTransition } from "native-base";
import React from "react";

const LogoScreen = () => {
  return (
    <Center flex={1} bgColor="primary.100">
      <PresenceTransition
        visible
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            duration: 2500,
          },
        }}
      >
        <Image
          alt="FSMIS Logo"
          source={require("../assets/images/logo.png")}
          size={{ base: 300, md: 500, lg: 700 }}
        />
      </PresenceTransition>
    </Center>
  );
};

export default LogoScreen;
