using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Restaurant.Models.Security;
using Restaurant.Models;
using System.Data.Entity;
namespace Restaurant.Controllers.Waiter
{
    public class Waiter_HomeController : Controller
    {
        private Model1 cons = new Model1();
        // GET: Waiter_Home
        [CustomAuthorize(Roles = "Nhân viên phục vụ")]
        // GET: Manager_TrangThaiBan
        public ActionResult DanhSach()
        {
            ViewBag.dsBan = cons.Bans.ToList();
            return View();
        }

   
        [HttpPost]
        public ActionResult DanhSach(Ban model)
        {

            // TODO: Add insert logic here
            using (var con = new Model1())
            {
                con.Bans.Add(model);
                con.SaveChanges();
                return RedirectToAction("DanhSach");
            }

        }

        public ActionResult CapNhatBan(string MaBan)
        {

            var obj = cons.Bans.Find(MaBan);
            DanhSachGoiMon dsGoiMon = new DanhSachGoiMon();
            ViewBag.ban = obj;
            var dsGoiMonList = cons.DanhSachGoiMons.ToList().Where(x => x.MaBan == MaBan);
            if (dsGoiMonList.Count() != 0)
            {
                dsGoiMon = dsGoiMonList.ElementAt(dsGoiMonList.Count() - 1);
            }
            ViewBag.fullListFood = cons.MonAns.ToList();
            ViewBag.khachHang = cons.KhachHangs.SingleOrDefault(x => x.MaKhachHang == dsGoiMon.MaKhachHang);
            ViewBag.hoaDon = cons.HoaDons.SingleOrDefault(x => x.MaHoaDon == dsGoiMon.MaHoaDon);
            ViewBag.danhGia = cons.HoaDons.SingleOrDefault(x => x.MaGoiMon == dsGoiMon.MaGoiMon);
            ViewBag.nhanVien = cons.NhanViens.SingleOrDefault(x => x.MaNhanVien == dsGoiMon.MaNhanVien);
            ViewBag.dsGoiMon = dsGoiMon;
            var dsMonAn = cons.DSGM_MonAn.ToList().Where(i => i.MaGoiMon == dsGoiMon.MaGoiMon);
            ViewBag.dsMonAn = dsMonAn;
            List<MonAn> listMonAn = new List<MonAn>();
            foreach (var item in dsMonAn)
            {
                MonAn mon = cons.MonAns.SingleOrDefault(x => x.MaMonAn == item.MaMonAn);
                listMonAn.Add(mon);
            }
            ViewBag.listMonAn = listMonAn;
            return View();
        }


        [HttpPost]
        public ActionResult CapNhatBan(Ban model)
        {

            using (var con = new Model1())
            {
                var obj = con.Bans.Find(model.MaBan);
                obj.MaBan = model.MaBan;
                obj.TenBan = model.TenBan;
                obj.TrangThai = model.TrangThai;
                con.SaveChanges();
                return RedirectToAction("DanhSach");

            }

        }

       

        public JsonResult addFood(string MaGoiMon, string MaMonAn, int SoLuong, string ThoiGian)
        {
            var context = new Model1();
            using (DbContextTransaction transaction = context.Database.BeginTransaction())
            {
                try
                {
                    DSGM_MonAn newItem = new DSGM_MonAn();
                    newItem.MaGoiMon = MaGoiMon;
                    newItem.MaMonAn = MaMonAn;
                    newItem.SoLuong = SoLuong;
                    newItem.TinhTrang = 0;
                    newItem.ThoiGian = ThoiGian;
                    context.DSGM_MonAn.Add(newItem);
                    context.SaveChanges();
                    transaction.Commit();
                    return Json(new { status = true });
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    return Json(new { status = false });
                }
            }
        }
        public JsonResult updateStatus(string MaGoiMon, string MaMonAn)
        {
            var context = new Model1();
            using (DbContextTransaction transaction = context.Database.BeginTransaction())
            {
                try
                {
                    DSGM_MonAn newItem = context.DSGM_MonAn.Where(x => (x.MaGoiMon == MaGoiMon) && (x.MaMonAn == MaMonAn)).FirstOrDefault();
                    newItem.TinhTrang = 1;
                    context.SaveChanges();
                    transaction.Commit();
                    return Json(new { status = true });
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    return Json(new { status = false });
                }
            }
        }

        public JsonResult deleteFood(string MaGoiMon, string MaMonAn)
        {
            var context = new Model1();
            using (DbContextTransaction transaction = context.Database.BeginTransaction())
            {
                try
                {
                    DSGM_MonAn newItem = context.DSGM_MonAn.Where(x => (x.MaGoiMon == MaGoiMon) && (x.MaMonAn == MaMonAn)).FirstOrDefault();
                    context.DSGM_MonAn.Remove(newItem);
                    context.SaveChanges();
                    transaction.Commit();
                    return Json(new { status = true });
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    return Json(new { status = false });
                }
            }
        }

    }
}