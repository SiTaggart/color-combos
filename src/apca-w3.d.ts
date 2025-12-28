declare module 'apca-w3' {
  export function calcAPCA(
    textColor: string | number,
    bgColor: string | number,
  ): number;
  export function fontLookupAPCA(
    contrast: number,
    places?: number,
  ): (string | number)[];
}
