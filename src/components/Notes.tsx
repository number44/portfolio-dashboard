import React from "react";
interface PropsI {
    data: Datai[] | null;
}
interface Datai {
    name: string;
    slug: string;
    content: string;
}

const Notes = ({ data }: PropsI) => {
    console.log("data :", data);
    if (!data) {
        return <h1>loading ...</h1>;
    }
    return (
        <>
            {data &&
                data.map((note, index) => (
                    <div key={index} className="shadow p-3">
                        {note.name}
                    </div>
                ))}
        </>
    );
};

export default Notes;
