import { Response, Request } from "express";
import Profile from "../../types/profile";
const profileModel = require("../../models/profile");
import mongoose from "mongoose";

export const getProfiles = async (req: Request, res: Response): Promise<void> => {
    const profiles: Profile[] = await profileModel.find()
    res.status(200)
       .json(profiles)
}

export const getProfileByUsername = async (req: Request, res: Response): Promise<void> => {
    const profile: Profile | null = await profileModel.findOne({ username: req.params.username })
    res.status(200)
       .json(profile)
}

export const addProfile = async (req: Request, res: Response): Promise<void> => {
    const body = req.body as Pick<Profile, "username" | "workInfo" | "workExperience" | "education">
    const profile : Profile = new profileModel({
        username: body.username,
        workInfo: body.workInfo,
        workExperience: body.workExperience,
        education: body.education
    })    
    const newProfile : Profile = await profile.save()
    const allProfiles: Profile[] = await profileModel.find()
        
    res.status(201)
       .json({ message: "Profile added", profile: newProfile, profiles: allProfiles })
}

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
    const { params: { id }, body } = req
    const _Id = new mongoose.Types.ObjectId(id)
    const updatedProfile : Profile | null = await profileModel.findByIdAndUpdate(
        { _id: _Id },
        body
    )
    const allProfiles: Profile[] = await profileModel.find()

    res.status(200)
       .json({ message: "Profile updated", profile: updatedProfile, profiles: allProfiles })
}

export const deleteProfile = async (req: Request, res: Response): Promise<void> => {
    const _Id = new mongoose.Types.ObjectId(req.params.id)
    const deletedProfile : Profile | null = await profileModel.findByIdAndDelete(_Id)
    const allProfiles: Profile[] = await profileModel.find()

    res.status(200)
       .json({ message: "Profile deleted", profile: deletedProfile, profiles: allProfiles })
}

