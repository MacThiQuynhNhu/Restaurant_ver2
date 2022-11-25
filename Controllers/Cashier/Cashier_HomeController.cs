using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Restaurant.Models;
namespace Restaurant.Controllers.Cashier
{
    public class Cashier_HomeController : Controller
    {
        // GET: Cashier_Home
        Model1 con = new Model1();
        public ActionResult Index()
        {
            ViewBag.List_DanhSachGoiMon = con.DanhSachGoiMons.ToList().Where(x => x.MaHoaDon == null);
            return View();
        }

        public ActionResult ThemHoaDon(string ds)
        {

            ViewBag.List_NhanVien = con.NhanViens.ToList();
            var query = (from s in con.MonAns
                         join c in con.DSGM_MonAn on s.MaMonAn equals c.MaMonAn
                         join t in con.DanhSachGoiMons on c.MaGoiMon equals t.MaGoiMon 
                         //join e in con.HoaDons on t.MaHoaDon equals e.MaHoaDon
                        where t.MaGoiMon==ds

                         select new HOADON1
                         {

                             monan = s,
                             DSGM_MonAn = c,
                             DanhSachGoiMon = t,
                             //HoaDon = e


                             //s.TenMonAn,
                             //s.Gia,
                             //s.HinhAnh,
                             //s.DonViTinh,
                             //s.MoTa,
                             //t.ThoiGianBatDau, 
                             //t.ThoiGianKetThuc, 
                             //t.MucKhuyenMai, 
                             //t.DoiTuongApDung, 
                             //t.Mota
                         }).ToList();
            ViewBag.List_hoadon1 = query;
            ViewBag.MaGoiMon = ds;
            return View();
        }
        [HttpPost]
        public ActionResult ThemHoaDon(HoaDon model)
        {

            // TODO: Add insert logic here
            using (var con = new Model1())
            {
                model.TinhTrang = "Đã thanh toán";
                con.HoaDons.Add(model);

                DanhSachGoiMon ds = con.DanhSachGoiMons.Find(model.MaGoiMon);
                ds.MaHoaDon = model.MaHoaDon;

                con.SaveChanges();
                return RedirectToAction("Index");
            }
        }
    }
}