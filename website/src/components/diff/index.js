import React, {useEffect, useRef, useState} from 'react';
import {buildSchema} from 'graphql';
import {diff} from '@graphql-inspector/core';
import styles from './index.module.css';
import FlipMove from 'react-flip-move';

import Change from './Change';
import {DiffEditor, DiffOnMount} from '@monaco-editor/react';

const oldSchemaString = `
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

const newSchemaString = `
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

export default function Diff() {
    const diffRef = useRef(null)
    const [code, setCode] = useState(newSchemaString);
    const [changes, setChanges] = useState([]);

    useEffect(async () => {
        try {
            setChanges(await diff(oldSchema, buildSchema(code)));
        } catch (e) {
            console.error(e);
        }
    }, [code]);

    function handleEditorChange(value, event) {
        console.log("here is the current model value:", value);
        diffRef.current = value.getModifiedEditor();
        value.getModifiedEditor().onKeyUp(handleChange);
    }

    function handleChange(e) {
        console.log("here is the current model value:", e);
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
                    originalEditable: false
                }}
            />
            <FlipMove
                className={styles.diffChanges}
                enterAnimation="fade"
                leaveAnimation="fade"
            >
                {changes.map((change, i) => (
                    <Change key={i} value={change}/>
                ))}
            </FlipMove>
        </div>
    );
}
