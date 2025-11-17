import type { Node, BuiltInNode } from '@xyflow/react';

export type PositionLoggerNode = Node<{ label: string , lambda:string }, 'custom'>;
export type AppNode = BuiltInNode | PositionLoggerNode;
 