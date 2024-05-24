import icons from "./icons"

const { MdOutlineLibraryMusic,
        RiCompassDiscoverFill,
        RiBarChartBoxFill,
        SlUserFollow
} = icons
export const sidebarMenu = [
    {
        path: 'mymusic',
        text: 'Cá nhân',
        icons: <MdOutlineLibraryMusic size={24} />
    },
    {
        path: '',
        text: 'Khám phá',
        end: true,
        icons: <RiCompassDiscoverFill size={24} />
    },
    {
        path: 'zing-chart',
        text: '#zingchart',
        icons: <RiBarChartBoxFill size={24} />
    },
    {
        path: 'follow',
        text: 'Theo dõi',
        icons: <SlUserFollow size={24} />
    }
]