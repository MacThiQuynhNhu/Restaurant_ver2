using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Restaurant.Models.Security;
using Restaurant.Models;
using PagedList;
namespace Restaurant.Controllers.Receptionist
{
    public class Receptionist_HomeController : Controller
    {
        // GET: Receptionist_Home
        //[CustomAuthorize(Roles = "Tiếp tân")]
        public ActionResult Index(int? size, int? page, string searchString)
        {
            Model1 cons = new Model1();
            ViewBag.searchValue = searchString;
            ViewBag.page = page;
            // 2. Tạo danh sách chọn số trang
            List<SelectListItem> items = new List<SelectListItem>();
            items.Add(new SelectListItem { Text = "Tất cả", Value = "0" });
            items.Add(new SelectListItem { Text = "Đã đặt trước", Value = "1" });
            items.Add(new SelectListItem { Text = "Đang sử dụng", Value = "2" });
            items.Add(new SelectListItem { Text = "Trống", Value = "3" });
            // 2.1. Thiết lập số trang đang chọn vào danh sách List<SelectListItem> items
            foreach (var item in items)
            {
                if (item.Value == size.ToString()) item.Selected = true;
            }

            ViewBag.size = items;
            ViewBag.currentSize = size;
            var listBan_ = cons.Bans.ToList();
            List<Ban> list = new List<Ban>();
            if (size.ToString() == "1")
            {
                foreach (var i in listBan_)
                {
                    if (i.TrangThai == "Đã đặt trước")
                    {
                        list.Add(i);
                    }
                }
            }
            else if (size.ToString() == "2")
            {
                foreach (var i in listBan_)
                {
                    if (i.TrangThai == "Đang sử dụng")
                    {
                        list.Add(i);
                    }
                }
            }
            else if (size.ToString() == "3")
            {
                foreach (var i in listBan_)
                {
                    if (i.TrangThai == "Trống")
                    {
                        list.Add(i);
                    }
                }
            }
            else
            {
                foreach (var i in listBan_)
                {
                    list.Add(i);
                }
            }
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
            int checkTotal = (int)(list.ToList().Count / 50) + 1;
            // Nếu trang vượt qua tổng số trang thì thiết lập là 1 hoặc tổng số trang
            if (pageNumber > checkTotal) pageNumber = checkTotal;
            return View(list.ToPagedList(pageNumber, 50));
        }

    }
}