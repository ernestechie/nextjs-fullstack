import { User } from "@/types/auth";
import httpClient from "./axios";

export async function getMeDetails() {
  const apiRes = await httpClient.get("/auth/me");
  const apiData: User = await apiRes?.data?.user;
  return apiData;
}

export async function getAllUsers() {
  const apiRes = await httpClient.get("/users");
  const apiData: User[] = await apiRes?.data?.users;

  return apiData;
}
