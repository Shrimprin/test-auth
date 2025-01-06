import React from "react";

export type FileItem = {
  id: number;
  name: string;
  type: string;
  content: string | null;
  children?: FileItem[];
};

export const FileItemComponent: React.FC<{ item: FileItem }> = ({ item }) => {
  return (
    <div style={{ marginLeft: "20px" }}>
      <div>
        {item.type === "dir" ? "📁" : "📄"} {item.name}
      </div>
      {item.children &&
        item.children.map((child) => (
          <FileItemComponent key={child.id} item={child} />
        ))}
    </div>
  );
};
