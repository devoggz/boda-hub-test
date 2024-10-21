"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import React, { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { registerSchema } from "@/schemas";
import { register } from "../../../actions/register";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollShadow } from "@nextui-org/react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocation } from "@/hooks/useLocation";

import {
  Form,
  FormControl,
  FormField,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Link } from "@nextui-org/react";
import TermsConditions from "@/app/(share layout)/terms/page";
import FormError from "../ui/form-error";
import FormSuccess from "../ui/form-success";
import { countiesData } from "@/data/countyData";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const items = [
  {
    id: "mwenyepikipiki",
    label: "Mwenye Pikipiki",
  },
  {
    id: "mwendeshaji",
    label: "Mwendeshaji",
  },
  {
    id: "mechanic",
    label: "Mechanic",
  },
] as const;

const RegisterForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",

      lastName: "",
      county: "",
      subCounty: "",
      ward: "",
      phoneNumber: "",
      password: "",
      username: "",
      chairman: "",
      idNumber: "",
      bikeNumber: "",
      riderType: [],
      terms: false,
      stage: "",
    },
  });
  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    setError(""), setSuccess("");

    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);

        if (data.success) {
          router.push("/login");
        }
      });
    });
  };

  const {
    selectedCounty,
    selectedSubCounty,
    selectedWard,
    handleCountyChange,
    handleSubCountyChange,
    handleWardChange,
  } = useLocation(countiesData);

  const languages = [
    { label: "Mwendeshaji", value: "mwendeshaji" },
    { label: "Mwenye Pikipiki", value: "mwenye_pikipiki" },
    { label: "Mechanic", value: "mechanic" },
    { label: "Online Rider", value: "online_rider" },
  ] as const;

  return (
    <div className="container mb-6 mt-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4 items-center">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jina la kwanza</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jina la Pili</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="johndoe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nambari ya Simu </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="07000123456"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 items-center">
            <FormField
              control={form.control}
              name="idNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nambari ya Kipande</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="12345678"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* MAKE IT UPPERCASE */}
            <FormField
              control={form.control}
              name="bikeNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nambari ya PikiPiki</FormLabel>

                  <FormControl>
                    <Input
                      style={{ textTransform: "uppercase" }}
                      className="uppercase"
                      disabled={isPending}
                      placeholder="KMWT1234"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Separator className="my-6" />

          <div className="grid grid-cols-2 gap-4 items-center justify-between">
            {/* County Selector */}
            <FormField
              control={form.control}
              name="county"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chagua Kaunti Yako</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleCountyChange(value); // Update subcounty options based on selected county
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Kaunti" />
                      </SelectTrigger>
                      <SelectContent>
                        {countiesData.map((county) => (
                          <SelectItem
                            key={county.county_code}
                            value={county.county_name}
                          >
                            {county.county_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* SubCounty Selector */}
            <FormField
              control={form.control}
              name="subCounty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chagua Kaunti Ndogo</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleSubCountyChange(value); // Update ward options based on selected subcounty
                      }}
                      defaultValue={field.value}
                      disabled={!selectedCounty}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Kaunti Ndogo" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedCounty?.sub_counties.map((subCounty) => (
                          <SelectItem
                            key={subCounty.subcounty_name}
                            value={subCounty.subcounty_name}
                          >
                            {subCounty.subcounty_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Ward Selector */}
            <FormField
              control={form.control}
              name="ward"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chagua Ward Yako</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleWardChange(value); // Update stage options based on selected ward
                      }}
                      defaultValue={field.value}
                      disabled={!selectedSubCounty}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Ward" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedSubCounty?.wards.map((ward) => (
                          <SelectItem
                            key={ward.ward_name}
                            value={ward.ward_name}
                          >
                            {ward.ward_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Stage Selector */}
            <FormField
              control={form.control}
              name="stage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chagua Stage Yako</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!selectedWard}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Stage" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedWard?.stages.map((stage) => (
                          <SelectItem key={stage} value={stage}>
                            {stage}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="riderType"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Mwendeshaji/Mwenye Pikipiki/Mechanic</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value.length && "text-muted-foreground"
                        )}
                      >
                        {field.value.length
                          ? field.value
                              .map(
                                (val) =>
                                  languages.find(
                                    (language) => language.value === val
                                  )?.label
                              )
                              .join(", ")
                          : "Chagua"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Chagua ..." className="h-9" />
                      <CommandList>
                        <CommandEmpty>No Rider Type Found</CommandEmpty>
                        <CommandGroup>
                          {languages.map((language) => (
                            <CommandItem
                              key={language.value}
                              onSelect={() => {
                                const selectedLanguages = field.value || [];
                                if (
                                  selectedLanguages.includes(language.value)
                                ) {
                                  form.setValue(
                                    "riderType",
                                    selectedLanguages.filter(
                                      (lang) => lang !== language.value
                                    )
                                  );
                                } else {
                                  form.setValue("riderType", [
                                    ...selectedLanguages,
                                    language.value,
                                  ]);
                                }
                              }}
                            >
                              {language.label}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  field.value.includes(language.value)
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Unaweza kuchagua zaidi ya jibu moja hapa bora majibu yawe
                  kweli
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="chairman"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Je, wewe ni chairman?</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chagua" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="stage_chairman">
                      Stage Chairman
                    </SelectItem>
                    <SelectItem value="county_chairman">
                      County Chairman
                    </SelectItem>
                    <SelectItem value="ward_chairman">Ward Chairman</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    type="password"
                    placeholder="******"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md ">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    {" "}
                    Soma "Privacy Policy". Bonyeza " Kubali na Ueendelee' kama
                    umekubali " Terms and Conditions{" "}
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormSuccess message={success} />

          <FormError message={error} />

          <div className="mt-12">
            <Button
              disabled={isPending}
              className="w-full bg-bhgreen  mt-2 mb-2 text-white h-12 font-medium rounded-lg  
            "
            >
              Tengeneza Akaunti Yangu
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
