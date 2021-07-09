export const menuItems = [
    //Empresas clients y proyectos
    {
        id: 1,
        label: 'Gestionar',
        icon: 'ri-dashboard-line',
        link: '/',
        subItems: [

            {
                id: 1,
                label: 'Clientes',
                icon: 'ri-user-line align-middle mr-1',
                link: '/clientes'
            },
             {
                id: 1,
                label: 'Empresas',
                icon: 'ri-file-copy-2-line',
                link: '/empresas'
            },
             {
                id: 1,
                label: 'Proyectos',
                icon: 'ri-file-copy-2-line',
                link: '/proyectos'
            },
                  ],
       
    
    },
// usuarios
    {
        id: 1,
        label: 'Gestionar Usuarios',
        icon: 'ri-user-line align-middle mr-1',
        link: '/',
        subItems: [

            {
                id: 1,
                label: 'Usuarios',
                icon: 'ri-user-line align-middle mr-1',
                link: '/usuarios'
            },
                  ],
    },
    //menus que no se estarán habilitando aún

    {
        id: 1,
        label: 'Guía Rapida',
        icon: 'ri-arrow-go-forward-fill align-middle mr-1',
        link: '#',
    },
    {
        id: 1,
        label: 'Grupo de Trabajo',
        icon: 'ri-group-2-fill align-middle mr-1',
        link: '#',
    },
    {
        id: 1,
        label: 'Calendario de Sesiones',
        icon: 'ri-calendar-2-fill align-middle mr-1',
        link: '#',
    },
    {
        id: 1,
        label: 'Grupo de Asesores',
        icon: 'ri-contacts-book-2-fill align-middle mr-1',
        link: '#',
    },
    
]