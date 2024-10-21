import AddPostForm from "@/components/posts/AddPostForm";
import AddUserPostForm from "@/components/posts/AddUserPostForm";
import React from "react";

const page = () => {
  return (
    <div className="container mx-auto h-screen p-6  ">
      <AddUserPostForm />
    </div>
  );
};

export default page;
