"use client";

import {
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";

import React from "react";

interface UserProperties {
  usr_city: string;
  usr_industry: string;
  usr_job_title: string;
  usr_middle_name: string;
  usr_postcode: string;
  usr_salutation: string;
  usr_state_region: string;
  usr_street_address: string;
  usr_street_address_2: string;
}
interface UserData {
  id: string;
  email: string;
  family_name: string;
  given_name: string;
  picture: string;
  username: string;
  phone_number: string;
  properties: UserProperties;
}

export const KindeUserAuthButtons = () => {
  const { user, isAuthenticated, isLoading } = useKindeBrowserClient();

  if (isLoading) {
    return <div>loading...</div>;
  }


  return <UserDetails user={user as UserData} />;
};

const UserDetails = ({ user }: { user: UserData }) => {
  const { given_name, email, picture, family_name } = user;

  return (
    <>
      <div>
        <div className="flex justify-between items-center gap-4">
          {picture && (
            <Image
              src={picture}
              alt="Profile Picture"
              width={40}
              height={40}
              className="rounded-full mx-auto"
            />
          )}
          <div>
            <h2>
              {given_name} {family_name}
            </h2>
            <h2>{email}</h2>
          </div>
        </div>
      </div>

      <LogoutLink>Logout</LogoutLink>
    </>
  );
};

