import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { House } from "lucide-react";

export const Route = createRootRoute({
  component: () => (
    <>
      {/* <Nav /> */}
      <StyledNav />
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
  notFoundComponent: () => {
    return (
      <div className="flex items-center justify-center h-[90vh]">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>404 Not Found</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    );
  },
});

// const Nav = () => {
//   return (
//     <div className="p-2 flex gap-2">
//       <Link to="/" className="[&.active]:font-bold">
//         Home
//       </Link>{" "}
//       <Link to="/about" className="[&.active]:font-bold">
//         About
//       </Link>
//       <Link to="/coil" className="[&.active]:font-bold">
//         Coil
//       </Link>
//     </div>
//   );
// };

const StyledNav = () => {
  return (
    <div className="p-2 flex gap-4  w-full justify-evenly items-center">
      <div>
        <Link to="/" className="[&.active]:font-bold">
          <House />
        </Link>
      </div>
      <div className="flex items-center justify-center gap-5">
        <NavHelper
          name="Coil"
          fir="List Coil"
          sec="Add Coil"
          thr="Update Coil"
          for="Delete Coil"
          path1="/coil/list-coil"
          path2="/coil/update-coil"
          path3="/coil/delete-coil"
          path4="/coil/create-coil"
        />
        <NavHelper
          name="Wire"
          fir="List Wire"
          sec="Add Wire"
          thr="Update Wire"
          for="Delete Wire"
          path1="/wire/list-wire"
          path2="/wire/update-wire"
          path3="/wire/delete-wire"
          path4="/wire/create-wire"
        />
        <NavHelper
          name="Order"
          fir="List Order"
          sec="Add Order"
          thr="Update Order"
          for="Delete Order"
          path1="/order/list-orders"
          path2="/order/update-order"
          path3="/order/delete-order"
          path4="/order/create-order"
        />
      </div>
    </div>
  );
};
interface NavHelperProps {
  name: string;
  fir: string;
  sec: string;
  thr: string;
  for: string;
  path1: string;
  path2: string;
  path3: string;
  path4: string;
  children?: React.ReactNode;
}

const NavHelper = ({
  name,
  fir,
  sec,
  thr,
  for: fourth,
  path1,
  path2,
  path3,
  path4,
  children,
}: NavHelperProps) => {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>{name}</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <Link to={path1}>{fir}</Link>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            <Link to={path4}>{sec}</Link>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            <Link to={path2}>{thr}</Link>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            <Link to={path3}>{fourth}</Link>
          </MenubarItem>
          {children}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};
