export default class API {
  fetchUsers() {
    return [
      {
        user_id: 1,
        email: 'teszt@teszt.hu',
        firstname: 'john',
        lastname: 'snow',
        profile_img: null,
        is_admin: 1,
        enabled_status: 1,
        deleted: 0,
      },
    ]
  }
}
