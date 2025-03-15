import { User } from "@/types/auth";
import httpClient from "../axios";

export async function getMeDetails() {
  "use server";
  try {
    const apiRes = await httpClient.get("/auth/me");
    const apiData: User = await apiRes?.data?.user;
    return apiData;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function getAllUsers() {
  "use server";
  try {
    const apiRes = await httpClient.get("/users");
    const apiData: User[] = await apiRes?.data?.users;
    return apiData;
  } catch (err) {
    console.log(err);
    return null;
  }
}
