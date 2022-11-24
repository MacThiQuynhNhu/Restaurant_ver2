using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Restaurant.Models.Function;
using Restaurant.Models;
using PagedList;
namespace Restaurant.Controllers.Manager
{
    public class Manager_SignUpController : Controller
    {
        // GET: Manager_SignUp

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
            var properties = typeof(NhanVien).GetProperties();
            List<Tuple<string, bool, int>> list = new List<Tuple<string, bool, int>>();
            List<string> listHeadings = new List<string>();
            listHeadings.Add("STT");
            listHeadings.Add("Mã NV");
            listHeadings.Add("Họ tên");
            listHeadings.Add("Giới tính");
            listHeadings.Add("Số điện thoại");
            listHeadings.Add("Địa chỉ");
            listHeadings.Add("Chức vụ");
            listHeadings.Add("Tên đăng nhập");
            listHeadings.Add("Mật khẩu");
            foreach (var item in properties)
            {
                int order = 999;
                var isVirtual = item.GetAccessors()[0].IsVirtual;

                if (item.Name == "MaNhanVien")
                {
                    order = 2;
                }
                else if (item.Name == "HoTen")
                {
                    order = 1;
                }
                else if (item.Name == "GioiTinh")
                {
                    order = 3;
                }
                else if (item.Name == "SoDienThoai")
                {
                    order = 4;
                }
                else if (item.Name == "DiaChi")
                {
                    order = 5;
                }
                else if (item.Name == "ChucVu")
                {
                    order = 6;
                }
                else if (item.Name == "TenDangNhap")
                {
                    order = 6;
                }
                else if (item.Name == "MatKhau")
                {
                    order = 6;
                }
                else if (item.Name == "MaNhom")
                {
                    order = 6;
                }
                else continue;

                Tuple<string, bool, int> t = new Tuple<string, bool, int>(item.Name, isVirtual, order);
                list.Add(t);
            }
            list = list.OrderBy(x => x.Item3).ToList();
            // 3.1. Tạo Heading sắp xếp cho các cột
            int i = -1;
            foreach (var item in list)
            {
                i++;
                //if (i == 0)
                //{
                //    ViewBag.Headings += "<th style=\"text-align: center; width: 5%\" id=\"" + item.Item1 + "\">" + listHeadings[i] + "</th>";
                //}
                //else if (i == 1)
                //{
                //    ViewBag.Headings += "<th style=\"text-align: center; width: 5%\" id=\"" + item.Item1 + "\">" + listHeadings[i] + "</th>";
                //}
                //else if (i == 2)
                //{
                //    ViewBag.Headings += "<th style=\"text-align: center; width: 15%\" id=\"" + item.Item1 + "\">" + listHeadings[i] + "</th>";
                //}
                //else if (i == 3)
                //{
                //    ViewBag.Headings += "<th style=\"text-align: center; width: 15%\" id=\"" + item.Item1 + "\">" + listHeadings[i] + "</th>";
                //}
                //else if (i == 4)
                //{
                //    ViewBag.Headings += "<th style=\"text-align: center; width: 25%\" id=\"" + item.Item1 + "\">" + listHeadings[i] + "</th>";
                //}
                //else if (i == 5)
                //{
                //    ViewBag.Headings += "<th style=\"text-align: center; width: 25%\" id=\"" + item.Item1 + "\">" + listHeadings[i] + "</th>";
                //}
                ViewBag.Headings += "<th style=\"text-align: center\" id=\"" + item.Item1 + "\">" + listHeadings[i] + "</th>";
            }
            // 4. Truy vấn lấy tất cả đường dẫn
            var alldoc = from l in db.NhanViens select l;
            //var alldoc = db.DOCUMENTs.ToList();
            // 5.1. Thêm phần tìm kiếm
            if (!String.IsNullOrEmpty(searchString))
            {
                alldoc = alldoc.Where(s => s.MaNhanVien.Contains(searchString) || s.MatKhau.Contains(searchString) || s.TenDangNhap.Contains(searchString) || s.HoTen.Contains(searchString) || s.DiaChi.Contains(searchString) || s.SoDienThoai.Contains(searchString));
            }
            alldoc = alldoc.OrderBy(x => x.MaNhanVien);


            // 5.2. Nếu page = null thì đặt lại là 1.
            if (page == null) page = 1;

            // 5.3. Tạo kích thước trang (pageSize), mặc định là 5.
            int pageSize = (size ?? 10);
            if (size == null) pageSize = 10;

            ViewBag.pageSize = pageSize;
            ViewBag.listDauBep = db.NhanViens.ToList();
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
        public ActionResult DangKi()
        {
            return View();
        }
        
        [HttpPost]
        public ActionResult DangKi(NhanVien model, int GioiTinh)
        {
            var dm = new NhanVienF().DSNhanVien.Where(p => p.HoTen != null);
            ViewBag.MaDM = new SelectList(dm, "MaNhanVien", "HoTen", null);

            NhanVienF a = new NhanVienF();
            if (GioiTinh == 0) model.GioiTinh = false;
            else model.GioiTinh = true;
            a.Insert(model);
            return RedirectToAction("Index");
        }
    }
}