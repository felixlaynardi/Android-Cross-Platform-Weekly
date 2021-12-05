import React from 'react';

export interface Memory {
    id: string;
    imagePath: string | undefined;
    title: string;
    type: 'good' | 'bad';
    imgUrl: string | undefined;
    base64Url: string | undefined;
    lat: number;
    lng: number;
}

const MemoriesContext = React.createContext<{
    memories: Memory[];
    addMemory: (path: string, base64Data: string, title: string, type: 'good' | 'bad', lat: number, lng: number) => void;
    initContext: () => void
}>({
    memories: [],
    addMemory: () => {},
    initContext: () => {}
});

export default MemoriesContext;