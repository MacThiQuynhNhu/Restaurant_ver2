using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Restaurant.Models;


namespace Restaurant.Models.Function
{
    public class NguoiDungF
    {
        private Model1 context = new Model1();
        public account Login(string username, string pass)
        {
            var result = context.NhanViens.Where(a => a.TenDangNhap.Equals(username) &&
                                                       a.MatKhau.Equals(pass)).FirstOrDefault();
            account t = null;
            if (result != null)
            {
                t = new account();
                t.UserName = result.TenDangNhap;
                t.Password = result.MatKhau;

                t.Roles = (from a in context.NhomNguoiDungs
                           join b in context.NhanViens
                           on a.MaNhom equals b.MaNhom
                           where (a.TenNhom != null && b.TenDangNhap.Equals(username))
                           select a.TenNhom).ToList();

            }
            return t;
        }
    }
}