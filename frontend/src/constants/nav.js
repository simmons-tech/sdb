import * as ROUTES from './routes';

export const CATEGORIES = [
  "Home",
  "House Gov",
  "Lounges",
  "Directories"
]

export const LINKS = [
  [
    { url: ROUTES.HOME, name: "Home" },
    { url: ROUTES.PROFILE, name: "My Profile" },
    { url: ROUTES.GUEST_LIST, name: "Guest List" },
    { url: ROUTES.PACKAGES, name: "My Packages" },
    { url: ROUTES.LOANS, name: "My Loans" },
    { url: ROUTES.MAILING_LISTS, name: "Mailing Lists" },
    { url: ROUTES.POLLS, name: "Votes and Polls" },
    { url: ROUTES.LOTTERIES, name: "Lotteries" },
    { url: ROUTES.MOVIES, name: "Desk Movies List" },
    { url: ROUTES.LIBRARY, name: "Library Catalog" },
    { url: ROUTES.ABOUT, name: "About the DB" },
  ],
  [
    { url: ROUTES.HOUSE_FINANCES, name: "House Finances" },
    { url: ROUTES.MEETINGS, name: "House Meetings" },
    { url: ROUTES.SUBMIT_PROPOSAL, name: "Submit Proposal" },
  ],
  [
    { url: ROUTES.ANNOUNCEMENTS, name: "Announcements" },
    { url: ROUTES.MY_LOUNGE, name: "My Lounge" },
    { url: ROUTES.LOUNGE_DIR, name: "Lounge Directory" },
    { url: ROUTES.CREATE_LOUNGE, name: "Create Lounge" },
    { url: ROUTES.CREATE_LOUNGE_EVENT, name: "Create Lounge Event" },
    { url: ROUTES.LOUNGE_EXPENSES, name: "All Lounge Expenses" },
    { url: ROUTES.LOUNGE_EVENTS, name: "All Lounge Events" },
  ],
  [
    { url: ROUTES.RESIDENT_DIRECTORY, name: "Resident Directory" },
    { url: ROUTES.OFFICERS, name: "Student Officers" },
    { url: ROUTES.MEDLINKS, name: "Medlinks" },
    { url: ROUTES.ADVISORS, name: "Associate Advisors" },
    { url: ROUTES.GRAS, name: "GRAs" },
  ]
]