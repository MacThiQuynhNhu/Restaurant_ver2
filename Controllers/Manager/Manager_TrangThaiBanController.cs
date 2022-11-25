using Restaurant.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PagedList;

namespace Restaurant.Controllers.Manager
{
    public class Manager_TrangThaiBanController : Controller
    {

        private Model1 cons = new Model1();
        // GET: Manager_TrangThaiBan
        public ActionResult DanhSach()
        {
            ViewBag.dsBan = cons.Bans.ToList();
            return View();
        }

        public ActionResult ThemBan()
        {
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

        public ActionResult CapNhatBan(string MaBan, int? size, int? page, string searchString)
        {
            ViewBag.searchValue = searchString;
            ViewBag.page = page;
            ViewBag.MaBan = MaBan;
            // 2. Tạo danh sách chọn số trang
            List<SelectListItem> items = new List<SelectListItem>();
            items.Add(new SelectListItem { Text = "Tất cả", Value = "0" });
            items.Add(new SelectListItem { Text = "Đang chờ phục vụ", Value = "1" });
            items.Add(new SelectListItem { Text = "Đã được phục vụ", Value = "2" });
            // 2.1. Thiết lập số trang đang chọn vào danh sách List<SelectListItem> items
            foreach (var item in items)
            {
                if (item.Value == size.ToString()) item.Selected = true;
            }

            ViewBag.size = items;
            ViewBag.currentSize = size;
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
            if (size == null || size.ToString() == "0")
            {
                dsMonAn = dsMonAn.Where(i => i.MaGoiMon == dsGoiMon.MaGoiMon);
            }
            else if (size.ToString() == "1")
            {
                dsMonAn = dsMonAn.Where(i => i.TinhTrang == 0);
            }
            else
            {
                dsMonAn = dsMonAn.Where(i => i.TinhTrang == 1);
            }
            ViewBag.dsMonAn = dsMonAn;
            List<MonAn> listMonAn = new List<MonAn>();
            foreach (var item in dsMonAn)
            {
                MonAn mon = cons.MonAns.SingleOrDefault(x => x.MaMonAn == item.MaMonAn);
                listMonAn.Add(mon);
            }
            ViewBag.listMonAn = listMonAn;

            // 5.2. Nếu page = null thì đặt lại là 1.
            if (page == null) page = 1;

            // 5.3. Tạo kích thước trang (pageSize), mặc định là 5.
            int pageSize = 0;

            ViewBag.pageSize = pageSize;
            // 6. Toán tử ?? trong C# mô tả nếu page khác null thì lấy giá trị page, còn
            // nếu page = null thì lấy giá trị 1 cho biến pageNumber. 
            int pageNumber = (page ?? 1);
            ViewBag.pageNumber = pageNumber;

            // 6.2 Lấy tổng số record chia cho kích thước để biết bao nhiêu trang
            int checkTotal = (int)(dsMonAn.ToList().Count / 20) + 1;
            // Nếu trang vượt qua tổng số trang thì thiết lập là 1 hoặc tổng số trang
            if (pageNumber > checkTotal) pageNumber = checkTotal;
            return View(dsMonAn.ToPagedList(pageNumber, 20));
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

        public ActionResult XoaBan(string MaBan)
        {

            using (var con = new Model1())
            {
                var obj = con.Bans.Find(MaBan);
                con.Bans.Remove(obj);
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

        public JsonResult updateStatusBan(string MaBan, string TrangThai)
        {
            var context = new Model1();
            using (DbContextTransaction transaction = context.Database.BeginTransaction())
            {
                try
                {
                    Ban newItem = context.Bans.SingleOrDefault(x => x.MaBan == MaBan);
                    if (TrangThai == "0")
                    {
                        newItem.TrangThai = "Đã đặt trước";
                    }
                    else if (TrangThai == "1")
                    {
                        newItem.TrangThai = "Đang chờ phục vụ";
                    }
                    else
                    {
                        newItem.TrangThai = "Trống";
                    }
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