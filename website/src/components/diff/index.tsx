import React, { FC, useEffect, useRef, useState } from 'react';
import { buildSchema } from 'graphql';
import { diff } from '@graphql-inspector/core';
import styles from './index.module.css';
import FlipMove from 'react-flip-move';

import Change from './Change';
import { DiffEditor } from '@monaco-editor/react';

const oldSchemaString = /* GraphQL */ `
  type Post {
    id: ID!
    title: String
    createdAt: String
    modifiedAt: String
  }

  type Query {
    post: Post!
    posts: [Post!]
  }
`;

const newSchemaString = /* GraphQL */ `
  type Post {
    id: ID!
    title: String!
    createdAt: String
  }

  type Query {
    post: Post!
  }
`;

const oldSchema = buildSchema(oldSchemaString);

const Diff: FC = () => {
  const diffRef = useRef(null);
  const [code, setCode] = useState(newSchemaString);
  const [changes, setChanges] = useState([]);

  useEffect(() => {
    diff(oldSchema, buildSchema(code))
      .then((change) => setChanges(change))
      .catch(console.error);
  }, [code]);

  function handleEditorChange(value) {
    console.log('here is the current model value:', value);
    diffRef.current = value.getModifiedEditor();
    value.getModifiedEditor().onKeyUp(handleChange);
  }

  function handleChange(e) {
    console.log('here is the current model value:', e);
    setCode(diffRef.current.getValue());
  }

  return (
    <div className={styles.diffContainer}>
      <DiffEditor
        width="100%"
        height={300}
        language="graphql"
        theme="vs-dark"
        original={oldSchemaString}
        modified={code}
        onMount={handleEditorChange}
        options={{
          codeLens: false,
          lineNumbers: 'off',
          minimap: false,
          originalEditable: false,
        }}
      />
      <FlipMove
        className={styles.diffChanges}
        enterAnimation="fade"
        leaveAnimation="fade"
      >
        {changes.map((change, i) => (
          <Change key={i} value={change} />
        ))}
      </FlipMove>
    </div>
  );
};

export default Diff;
