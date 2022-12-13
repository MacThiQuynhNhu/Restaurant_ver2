using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Restaurant.Models;
using PagedList;

namespace Restaurant.Controllers.Receptionist
{
    public class Receptionist_KhachHangController : Controller
    {
        public ActionResult Index(int? size, int? page, string searchString)
        {
            Model1 db = new Model1();

            // 1. Tạo biến ViewBag gồm sortOrder, searchValue, sortProperty và page

            ViewBag.searchValue = searchString;
            ViewBag.page = page;

            // 2. Tạo danh sách chọn số trang
            List<SelectListItem> items = new List<SelectListItem>();
            items.Add(new SelectListItem { Text = "10", Value = "10" });
            items.Add(new SelectListItem { Text = "20", Value = "20" });
            items.Add(new SelectListItem { Text = "25", Value = "25" });
            items.Add(new SelectListItem { Text = "50", Value = "50" });
            items.Add(new SelectListItem { Text = "100", Value = "100" });
            items.Add(new SelectListItem { Text = "200", Value = "200" });

            // 2.1. Thiết lập số trang đang chọn vào danh sách List<SelectListItem> items
            foreach (var item in items)
            {
                if (item.Value == size.ToString()) item.Selected = true;
            }
            ViewBag.size = items;
            ViewBag.currentSize = size;

            // 3. Lấy tất cả tên thuộc tính của lớp DOCUMENT
            var properties = typeof(KhachHang).GetProperties();
            List<Tuple<string, bool, int>> list = new List<Tuple<string, bool, int>>();
            List<string> listHeadings = new List<string>();
            listHeadings.Add("STT");
            listHeadings.Add("Mã khách hàng");
            listHeadings.Add("Họ và tên");
            listHeadings.Add("Số điện thoại");
            listHeadings.Add("Số lần đặt bàn");
            listHeadings.Add("Số lần gọi món");
            foreach (var item in properties)
            {
                int order = 999;
                var isVirtual = item.GetAccessors()[0].IsVirtual;

                if (item.Name == "MaKhachHang")
                {
                    order = 1;
                }
                else if (item.Name == "TenKhachHang")
                {
                    order = 2;
                }
                else if (item.Name == "SDT")
                {
                    order = 3;
                }
                else if (item.Name == "SoLanDatBan")
                {
                    order = 4;
                }
                else if (item.Name == "SoLanGoiMon")
                {
                    order = 5;
                }
                else
                {
                    order = 5;
                };
                Tuple<string, bool, int> t = new Tuple<string, bool, int>(item.Name, isVirtual, order);
                list.Add(t);
            }
            listHeadings.Add("Tác vụ");
            list = list.OrderBy(x => x.Item3).ToList();
            // 3.1. Tạo Heading sắp xếp cho các cột
            int i = -1;
            foreach (var item in list)
            {
                i++;
                if (i == 0)
                {
                    ViewBag.Headings += "<th style=\"text-align: center; width: 5%\" id=\"" + item.Item1 + "\">" + listHeadings[i] + "</th>";
                }
                else if (i == 1)
                {
                    ViewBag.Headings += "<th style=\"text-align: center; width: 15%\" id=\"" + item.Item1 + "\">" + listHeadings[i] + "</th>";
                }
                else if (i == 2)
                {
                    ViewBag.Headings += "<th style=\"text-align: center; width: 25%\" id=\"" + item.Item1 + "\">" + listHeadings[i] + "</th>";
                }
                else if (i == 3)
                {
                    ViewBag.Headings += "<th style=\"text-align: center; width: 25%\" id=\"" + item.Item1 + "\">" + listHeadings[i] + "</th>";
                }
                else if (i == 4)
                {
                    ViewBag.Headings += "<th style=\"text-align: center; width: 10%\" id=\"" + item.Item1 + "\">" + listHeadings[i] + "</th>";
                }
                else
                {
                    ViewBag.Headings += "<th style=\"text-align: center; width: 10%\" id=\"" + item.Item1 + "\">" + listHeadings[i] + "</th>";
                }
            }
            ViewBag.Headings += "<th style=\"text-align: center\" id=\"task\">" + listHeadings[5] + "</th>";
            // 4. Truy vấn lấy tất cả đường dẫn
            var alldoc = from l in db.KhachHangs select l;
            //var alldoc = db.DOCUMENTs.ToList();
            // 5.1. Thêm phần tìm kiếm
            if (!String.IsNullOrEmpty(searchString))
            {
                alldoc = alldoc.Where(s => s.MaKhachHang.Contains(searchString) || s.TenKhachHang.Contains(searchString) || s.SDT.Contains(searchString));
            }
            alldoc = alldoc.OrderBy(x => x.MaKhachHang);


            // 5.2. Nếu page = null thì đặt lại là 1.
            if (page == null) page = 1;

            // 5.3. Tạo kích thước trang (pageSize), mặc định là 5.
            int pageSize = (size ?? 10);
            if (size == null) pageSize = 10;

            ViewBag.pageSize = pageSize;
            ViewBag.listKH = db.KhachHangs.ToList();
            // 6. Toán tử ?? trong C# mô tả nếu page khác null thì lấy giá trị page, còn
            // nếu page = null thì lấy giá trị 1 cho biến pageNumber. 
            int pageNumber = (page ?? 1);
            ViewBag.pageNumber = pageNumber;

            // 6.2 Lấy tổng số record chia cho kích thước để biết bao nhiêu trang
            int checkTotal = (int)(alldoc.ToList().Count / pageSize) + 1;
            // Nếu trang vượt qua tổng số trang thì thiết lập là 1 hoặc tổng số trang
            if (pageNumber > checkTotal) pageNumber = checkTotal;
            return View(alldoc.ToPagedList(pageNumber, pageSize));
        }
        public ActionResult ThemMoi()
        {
            return View();
        }
        [HttpPost]
        public ActionResult ThemMoi(KhachHang model)
        {
            Model1 db = new Model1();
            //thêm mới bản ghi
            db.KhachHangs.Add(model);
            //lưu lại thay đổi
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        public ActionResult CapNhat(string idKhachHang)
        {
            Model1 db = new Model1();
            KhachHang model2 = db.KhachHangs.Find(idKhachHang);
            return View(model2);
        }

        [HttpPost]
        public ActionResult CapNhat(KhachHang model)
        {
            Model1 db = new Model1();
            //tim doi tuong
            var updateModel = db.KhachHangs.Find(model.MaKhachHang);
            //gan gia tri
            updateModel.TenKhachHang = model.TenKhachHang;
            updateModel.SDT = model.SDT;
            updateModel.SoLanDatBan = model.SoLanDatBan;
            updateModel.SoLanGoiMon = model.SoLanGoiMon;
            //luu thay doi
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        public ActionResult Xoa(string idKhachHang)
        {
            Model1 db = new Model1();
            //tim doi tuong
            var updateModel = db.KhachHangs.Find(idKhachHang);
            //XOa
            db.KhachHangs.Remove(updateModel);
            //luu thay doi
            db.SaveChanges();

            return RedirectToAction("Index");
        }

    }
}