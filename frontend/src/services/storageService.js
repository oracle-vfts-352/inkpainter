/*const API_URL =
import.meta.env.VITE_API_URL || "http://localhost:3000";*/
import { API } from "./api";

export async function uploadImage(
    file,
    username="guest"){

    const formData = new FormData();

    formData.append(
        "image",
        file
    );

    formData.append(
        "username",
        username
    );

    const response =
        await fetch(
            //`${API_URL}/upload`,
            `${API}/upload`,
            {
                method:"POST",
                body:formData
            }
        );


    if(!response.ok){
        const error = await response.json();

        throw error;
    }


    return await response.json();

}

export async function getJobStatus(jobId){

    const response =
        await fetch(
            //`${API_URL}/jobs/${jobId}`
            `${API}/jobs/${jobId}`
        );

    if(!response.ok){

        throw new Error(
            "Failed to get job status"
        );

    }

    return await response.json();

}