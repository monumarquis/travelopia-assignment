import React from "react";

declare module 'react-csv' {
  export interface CSVLinkProps {
    data: any[] | object[];
    headers?: any[] | object[];
    separator?: string;
    filename?: string;
    onClick?: () => void;
    asyncOnClick?: boolean;
    target?: string;
    rel?: string;
    style?: string | object;
    className?: string;
    enclosingCharacter?: string;
    uFEFF?: boolean;
    onClickEvent?: (event: MouseEvent, done: (event?: MouseEvent) => void) => void;
    onMouseOver?: (event: MouseEvent) => void;
    onMouseOut?: (event: MouseEvent) => void;
  }

  export const CSVLink: React.ComponentType<CSVLinkProps>;

  export interface CSVDownloadProps {
    data: any[] | object[];
    headers?: any[] | object[];
    separator?: string;
    filename?: string;
    target?: string;
    rel?: string;
    uFEFF?: boolean;
  }

  export const CSVDownload: React.ComponentType<CSVDownloadProps>;
}