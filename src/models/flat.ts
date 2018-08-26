import { Suburb } from "../providers/trademe/trademe";

export interface Flat {
    address: String
    suburb: Suburb
    city: String
    overallRating: number
    dampnessRating: number
    landlordRating: number
}