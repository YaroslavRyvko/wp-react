// BlockLoader.js
import React from "react";
import * as BlockComponents from "../../blocks/index";

const BlockLoader = ({ blocks }) => {
  return (
    <>
      {blocks.map((block, index) => {
        const BlockComponent = BlockComponents[block.acf_fc_layout]; // acf_fc_layout to determine the block type
        return BlockComponent ? (
          <BlockComponent key={index} fields={block} />
        ) : null;
      })}
    </>
  );
};

export default BlockLoader;
