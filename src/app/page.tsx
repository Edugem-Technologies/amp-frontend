import CustomLayout from "./components/CustomLayout"

export default function Home() {
  const user = { "account_uuid": "51368fe9-69ab-4769-9626-9a84a184ff33", "created_at": "Tue, 12 Dec 2023 10:29:51 GMT", "deactivated_at": null, "email": "superadmin@virtu-sign.com", "email_verified_at": null, "first_name": "Super", "force_password_update": false, "id": 10, "last_name": "Admin", "mobile_number": "", "signature": null, "updated_at": "Thu, 14 Dec 2023 16:03:04 GMT", "user_name_list": ["superadmin@virtu-sign.com"], "user_type": "super_admin", "uuid": "2d1048a8-d4e9-4062-9e3f-f3d303019da3" }
  return (
    <CustomLayout user={user}>
      <h1>Boiler plate code for NEXT 13.4</h1>
    </CustomLayout>
  )
}
