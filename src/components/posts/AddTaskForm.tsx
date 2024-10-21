"use client";

import React, { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addTaskSchema } from "@/schemas";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormError from "../ui/form-error";
import FormSuccess from "../ui/form-success";
import { addtask } from "../../../actions/addtask";

const AddTaskForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | "">("");
  const [success, setSuccess] = useState<string | "">("");
  const [isPostAdded, setIsPostAdded] = useState(false); // Track post added status

  const form = useForm<z.infer<typeof addTaskSchema>>({
    resolver: zodResolver(addTaskSchema),
    defaultValues: {
      category: "",
      videoURL: "",
      thumbnailURL: "",
    },
  });

  const onSubmit = (values: z.infer<typeof addTaskSchema>) => {
    console.log("Submitting values:", values);
    setError("");
    setSuccess("");
    setIsPostAdded(false);

    startTransition(() => {
      addtask(values).then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setSuccess(data.success ?? "");
          setIsPostAdded(true); // Set post added to true on success
        }
      });
    });
  };

  // Function to reload the page
  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <h2
            className="text-transparent rounded-lg bg-clip-text bg-gradient-to-r    
            from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% 
            animate-text text-2xl font-bold titlecase leading-[48px]"
          >
            Add New Task
          </h2>

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Task Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="storipesa">Stori za Pesa</SelectItem>
                    <SelectItem value="sokoboda">Soko la Boda</SelectItem>
                    <SelectItem value="vifaa">Vifaa na Mapambo</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="thumbnailURL"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thumbnail URL</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="videoURL"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video URL</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormSuccess message={success} />
          <FormError message={error} />

          {!isPostAdded ? (
            <Button className="w-full" type="submit" disabled={isPending}>
              Add Task
            </Button>
          ) : (
            <Button className="w-full" onClick={reloadPage}>
              Add Another Task
            </Button>
          )}
        </form>
      </Form>
    </>
  );
};

export default AddTaskForm;
