export enum Paths {
    LANDING='/',
    LOGIN='/login',
    SIGNUP='/signup',
    BOOKTABLE='/bookTable',
    RESERVATION='/reservation',
    LOCATION='/location'
}
export const getLocationPath = (id: string | number) => `${Paths.LOCATION}/${id}`;