import * as ROUTES from './routes';

export const CATEGORIES = [
  "Home",
  "House Gov",
  "Lounges",
  "Directories",
  "Admin",
  "Desk",
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
    { url: ROUTES.MISC, name: "Miscellaneous" },
    { url: ROUTES.ABOUT, name: "About the DB" },
    { url: ROUTES.LOGIN, name: "Login", hidden: true },
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
    { url: ROUTES.MENTORS, name: "Resident Peer Mentors" },
    { url: ROUTES.PLEASURE, name: "Pleasure Educators" },
    { url: ROUTES.GRAS, name: "GRAs"},
  ],
  [
    { url: ROUTES.IMPERSONATE, name: "Be Another User", adminOnly: true},
    { url: ROUTES.EDIT_GROUPS, name: "Edit Student Groups", adminOnly: true},
    { url: ROUTES.EDIT_OFFICERS, name: "Edit Student Officers", adminOnly: true},
    { url: ROUTES.SIGN_UP, name: "Add User", adminOnly: true},
    { url: ROUTES.BULK_USER, name: "Bulk Update DB", adminOnly: true},
    { url: ROUTES.ROOM_STATUS_SUMMARY, name: "Room Status Summary", adminOnly: true},
    { url: ROUTES.ROOM_HISTORY, name: "Room History", adminOnly: true},
    { url: ROUTES.TREASURY_HOME, name: "Treasury", adminOnly: true},
  ],
  [
    {url: ROUTES.DESK_HOME, name: "Dashboard", deskOnly: true},
    {url: ROUTES.ALL_PACKAGES, name: "All Waiting Packages", deskOnly: true},
    {url: ROUTES.SEARCH_PACKAGES, name: "Package Pickup", deskOnly: true},
    {url: ROUTES.REGISTER_PACKAGES, name: "Register Packages", deskOnly: true},
    {url: ROUTES.DESK_CHECKOUT, name: "Item Checkout", deskOnly: true},
    {url: ROUTES.DESK_ITEM_RETURN, name: "Item Return", deskOnly: true},
    {url: ROUTES.DESK_ADD_ITEM, name: "Add Item", deskCaptainOnly: true},
    {url: ROUTES.DESK_GUEST_LIST, name: "Search Guest List", deskOnly: true}
  ]
]