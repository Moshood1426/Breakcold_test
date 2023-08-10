//DO THE USER PAGE HERE
import React, { useState, useEffect } from "react";
import SingleUserType from "@/dto/types";
import SingleUser from "@/components/SingleUser";

const index: React.FC<SingleUserType> = () => {
  const [singleUser, setSingleUser] = useState<null | SingleUserType>(null);

  useEffect(() => {
    //get single user
  }, []);

  return <div>{singleUser && <SingleUser {...singleUser} />}</div>;
};

export default index;
