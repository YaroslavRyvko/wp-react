// BlockLoader.js
import React from "react";
import * as BlockComponents from "../../insights-blocks/index";

const BlockLoader = ({ blocks }) => {
  return (
    <>
      {blocks.map((block, index) => {
        const BlockComponent = BlockComponents[block.acf_fc_layout];
        return BlockComponent ? (
          <BlockComponent key={index} fields={block} />
        ) : null;
      })}
    </>
  );
};

export default BlockLoader;
