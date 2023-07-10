import React from "react";
import { useParams } from "react-router-dom";

function ViewStudentProfile() {

    let params = useParams();
    console.log(params);
return <div>
    hi student
</div>
}
export default ViewStudentProfile;