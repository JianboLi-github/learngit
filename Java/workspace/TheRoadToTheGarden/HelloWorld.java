import java.util.Scanner;

public class HelloWorld {

    public void method1(final int i) {
        System.out.println(i);
    }

    // 计算肥胖指数BMI=体重/（身高*身高）
    public void BMI() {
        /**
         * 需要注意的是，如果在通过nextInt()读取了整数后， 再接着读取字符串，读出来的是回车换行:"\r\n",
         * 因为nextInt仅仅读取数字信息，而不会读取回车换行"\r\n".
         */

        Scanner s = new Scanner(System.in);
        System.out.print("请输入身高(M)>");
        float height = s.nextFloat();
        System.out.print("请输入体重(KG)>");
        float weight = s.nextFloat();
        System.out.println("身高：" + height + ", 体重" + weight);
        float bmi = weight / (height * height);
        System.out.println("bim:" + bmi);
        if (bmi < 18.5) {
            System.out.println("体重过轻!");
        } else if (bmi < 24) {
            System.out.println("恭喜！体重正常");

        } else if (bmi < 27) {
            System.out.println("体重过重，要注意运动了！");
        } else if (bmi < 30) {
            System.out.println("轻度肥胖，要控制饮食，多运动！");

        } else if (bmi < 35) {
            System.out.println("中度肥胖，是时候制定减肥计划了，骚年！");

        } else {
            System.out.println("重度肥胖，我觉得你还是可以拯救一下的！");
        }
    }

    public static void main(String[] args) {
        /*
         * int i = 1; byte b = 5; int i1 = 10; int i2 = 300;;;;;; // 还会 b = (byte) i1;
         * System.out.println(b);
         * 
         * b = (byte) i2; System.out.println(b);
         * 
         * System.out.println(Integer.toBinaryString(i2)); short a = 1; short c = 2;
         * System.out.println((a+c)); int j = ++i + i++ + ++i + ++i + i++;
         * System.out.println(j); new HelloWorld().method1(5);
         */
        new HelloWorld().BMI();
        int i = 1;
        boolean b = !(i++ == 3) ^ (i++ == 2) && (i++ == 3);
        System.out.println(b);

    }
}
