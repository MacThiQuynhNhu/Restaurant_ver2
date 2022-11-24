using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Restaurant.Models.Function
{
    public class MonAnF
    {
        private Model1 context;

        public MonAnF()
        {
            context = new Model1();
        }

        public IQueryable<MonAn> DSBaiViet
        {
            get { return context.MonAns; }
        }

        // Trả về một đối tượng danh mục, khi biết Khóa
        public MonAn FindEntity(string MaMonAn)
        {
            MonAn dbEntry = context.MonAns.Find(MaMonAn);
            return dbEntry;
        }

        // Thêm một đối tượng
        public bool Insert(MonAn model)
        {
            MonAn dbEntry = context.MonAns.Find(model.MaMonAn);

            if (dbEntry != null)
            {
                return false;

            }
            context.MonAns.Add(model);

            context.SaveChanges();

            return true;
        }
    }
}