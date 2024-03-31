import { category, gender, grade, individualOrGroup, major, musicOrPose } from "./inputTypes"

export type Reception = {
    timestamp: Date
    individualOrGroup: individualOrGroup
    name: string
    gender: gender
    birth: string
    contact: string
    email: string
    school: string
    academy: string
    instructorName: string
    instructorContact: string
    major: major
    grade: grade
    category: category
    artTitle: string | null
    musicFile: File | null
    musicOrPose: musicOrPose | null
    participants: string[] | null
}