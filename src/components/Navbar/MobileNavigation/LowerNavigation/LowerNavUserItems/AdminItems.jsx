import { HiHome } from "react-icons/hi"
import { HiPencil } from "react-icons/hi"
import { HiBookOpen } from "react-icons/hi"
import { GrUserSettings } from "react-icons/gr"



export const AdminNavItems = [
    {
        icon: <HiHome />,
        title: "Home",
        route: "/"
    },
    {
        icon: <HiPencil />,
        title: "Profile",
        route: "/updateprofile",
    },
    {
        icon: <HiBookOpen />,
        title: "Books",
        route: "/cart"
    },
    {
        icon: <GrUserSettings />,
        title: "Admin",
        route: "/usermanagement"
    },

]

export const UserNavItems = [
    {
        icon: <HiHome />,
        title: "Home"
    },
    {
        icon: <HiPencil />,
        title: "Profile",
    },
    {
        icon: <HiBookOpen />,
        title: "Books"
    },
]