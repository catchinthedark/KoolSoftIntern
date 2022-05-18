import { Response, Request } from "express";
import Profile, { CVNote, PastWork, WorkInfo } from "../../types/profile";
import profileModel from "../../models/profile";
import mongoose from "mongoose";
import { AuthRequest } from "../../common/request";
import { BadRequestError, ForbiddenError, ServerError, UnauthorizedError } from "../../common/error";
import { failureResponse, successResponse } from "../../common/response";
import Account from "../../types/account";

export const getProfiles = async (req: AuthRequest, res: Response): Promise<void> => {
    const { accountID, role } = req.credentials!;
    if (role != 'HR') throw new ForbiddenError({ error: "You don't have permission to do this."})
    const profiles: Profile[] = await profileModel.find()
    return successResponse(res, profiles)
}

export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
    const { accountID, role } = req.credentials!;
    const body = req.body as Pick<Profile, "accountID">
    const profile: Profile | null = await profileModel.findOne({accountID: body.accountID})
    if (!profile) return failureResponse(res, { data: -2 })
    return successResponse(res, profile)
}

export const addProfile = async (account: Account): Promise<Profile> => {
    let type
    if (account.role === 'Applicant') type = 'CV'
        else type = 'Profile'
    const cvNote : CVNote = {
        status: '',
        note: ''
    }
    const workInfo : WorkInfo = {
        department: '',
        title: '',
        salary: 0,
        type: '',
        hireDate: ''
    }
    const profile : Profile = new profileModel({
        accountID: account._id,
        type: type,
        cvNote: cvNote,
        workInfo: workInfo,
        workExperience: [],
        personalProjects: [],
        achievements: [],
        education: [],
    })    
    const newProfile : Profile = await profile.save()
   
    return newProfile
}

export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
    const { accountID, role } = req.credentials!
    const body = req.body as Profile
    if (accountID !== body._id && role !== "HR") throw new UnauthorizedError({message: "You don't have permission to update this"})
    const updatedProfile : Profile | null = await profileModel.findOneAndUpdate({ _id: body._id }, {$set: { type: body.type, cvNote: body.cvNote, workInfo: body.workInfo, workExperience: body.workExperience, personalProjects: body.personalProjects, achievements: body.achievements, education: body.education }}, { new: true})
    if (!updatedProfile) throw new BadRequestError({message: "cannot find profile"})
    return successResponse(res, {profile: updatedProfile})
}

export const deleteProfile = async (req: AuthRequest, res: Response): Promise<void> => {
    const { accountID, role } = req.credentials!;
    if (role != 'HR') throw new ForbiddenError({ error: "You don't have permission to do this."})
    const _Id = new mongoose.Types.ObjectId(req.params.id)
    const deletedProfile : Profile | null = await profileModel.findByIdAndDelete(_Id)
    const allProfiles : Profile[] = await profileModel.find()
    if (!deletedProfile) return failureResponse(res, {data: -2})
    return successResponse(res, { profile: deletedProfile, profiles: allProfiles })
}

