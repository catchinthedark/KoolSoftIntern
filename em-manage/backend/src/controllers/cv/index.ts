import { Response, Request } from "express";
import CV from "../../types/cv";
import cvModel from "../../models/cv";
import mongoose from "mongoose";

export const getCVs = async (req: Request, res: Response): Promise<void> => {
    const CVs: CV[] = await cvModel.find()
    res.status(200)
       .json(CVs)
}

export const getCVByUsername = async (req: Request, res: Response): Promise<void> => {
    const cv: CV | null = await cvModel.findOne({ username: req.params.username })
    res.status(200)
       .json(cv)
}

export const addCV = async (req: Request, res: Response): Promise<void> => {
    const body = req.body as Pick<CV, "username" | "status" | "round" | "note" | "workExperience" | "education">
    const cv : CV = new cvModel({
        username: body.username,
        status: body.status,
        round: body.round,
        note: body.note,
        workExperience: body.workExperience,
        education: body.education
    })    
    const newCV : CV = await cv.save()
    const allCVs: CV[] = await cvModel.find()
        
    res.status(201)
       .json({ message: "CV added", cv: newCV, CVs: allCVs })
}

export const updateCV = async (req: Request, res: Response): Promise<void> => {
    const { params: { id }, body } = req
    const _Id = new mongoose.Types.ObjectId(id)
    const updatedCV : CV | null = await cvModel.findByIdAndUpdate(
        { _id: _Id },
        body
    )
    const allCVs: CV[] = await cvModel.find()

    res.status(200)
       .json({ message: "CV updated", cv: updatedCV, CVs: allCVs })
}

export const deleteCV = async (req: Request, res: Response): Promise<void> => {
    const _Id = new mongoose.Types.ObjectId(req.params.id)
    const deletedCV : CV | null = await cvModel.findByIdAndDelete(_Id)
    const allCVs: CV[] = await cvModel.find()

    res.status(200)
       .json({ message: "CV deleted", cv: deletedCV, CVs: allCVs })
}

