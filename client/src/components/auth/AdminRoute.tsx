import React, { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { Navigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from "../../firebase/config";
import Spinner from "../ui/Spinner";

// Roles that have elevated access
const ALLOWED_ROLES = ["admin"];

// Reusable permission-checking route component
const RoleRoute: React.FC<{ children: React.ReactNode; allowedRoles: string[] }> = ({
  children,
  allowedRoles,
}) => {
  const [user, loading, error] = useAuthState(auth);
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        if (user) {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          const role = userDoc.data()?.role;
          if (userDoc.exists() && allowedRoles.includes(role)) {
            setHasAccess(true);
          } else {
            setHasAccess(false);
          }
        }
      } catch (err) {
        console.error("Error checking user role:", err);
        setHasAccess(false);
      }
    };

    if (user) {
      checkUserRole();
    }
  }, [user, allowedRoles]);

  if (loading) return <Spinner />;
  if (error) return <div>Error: {error.message}</div>;

  if (!user) {
    return <Navigate to="/sign-in" />;
  }

  if (hasAccess === null) {
    return (
      <div className="flex justify-center mt-10">
        <p className="text-lg font-semibold">Checking permissions...</p>
        <Spinner />
      </div>
    );
  }

  return hasAccess ? <>{children}</> : <Navigate to="/" />;
};
  
// AdminRoute Component
export const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <RoleRoute allowedRoles={["admin"]}>{children}</RoleRoute>;
};


// ProtectedRoute for Admin, CorporateAdmin, Manager, Editor
export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <RoleRoute allowedRoles={ALLOWED_ROLES}>{children}</RoleRoute>;
};
